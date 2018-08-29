## Choosing the target

The choice was simple for me. I've already done the assignment for Tutti hiring process which happened to be the exact same assignment, minus the requirement to hack the mobile app and make the solution PWA-compliant. So, I decided to cheat: just hack the Tutti mobile app, replace the API used in my Tutti solution with the mobile API, make the app a PWA, and bam, I'm done.

## It's hackening

Oh, boy, was I wrong about "just hacking the mobile app". Let's go into details step by step.

### The Proxy

I went for **mitmproxy** first. It's open source, command-line with an optional web interface, available in my distro's repository. What's not to love? After a fairly quick setup and test with https-enabled websites, there was sadly no activity in mitmproxy when I tried to use Tutti app, which displayed an error on the landing screen.

Some research revealed a nasty security-by-obsucity technique called certificate pinning: Andriod devs would sometimes make their apps accept only the SSL certificate used by their API in a vain attempt to protect the API from snooping. Even worse, newer versions of Android would implement this by default.

### Cracks are forming

My next step was to try to poke into the apk and try to figure out what's happening. After downloading the apk using a random website suggested by Google, **dex2jar** had no problems decompiling the app. An inspection however revealed no explicit certificate pinning code.

The only thing left was to try to trick Android's implicit restriction on custom certificates. https://medium.com/@elye.project/android-nougat-charlesing-ssl-network-efa0951e66de provided instructions and the tool used was apkstudio, a lightweight alternative to full-blown IDEs which can extract and decode an apk, rebuild and sign them.

Frustrated with mitmproxy's lack of reporting of failed SSL handshakes, I also switched to **Charles Proxy**. While not an open source or even free solution, it's far more mature than mitmproxy, reports the failed handshakes and provides a nice option to clear the request log so that we can focus on new requests.

When installed on a device, the modified app would still fail to connect to the API, but Charles revealed something confusing. The requests to the API weren't even https, and they were failing because of 301 responses without a Location header. After some time of hepless fumbling, I thought to check the verison number of the app and figured out that my choice of apk download method had tricked me. The website I picked gave me a severely outdated version that was using an old API.

### Release the cracken

Another website provided the latest version of the apk. dex2jar, however, betrayed this time, and failed to decomple with close to 50 errors. I can't pretend I understood much of the problem, but it seems that new compilers for Android don't care much about Java's type strictness at bytecode level, opting instead to liberally assign data between variables of different types, probably as a form of optimization. According to dex2jar contributors, my options were either fix the issues in the apk, all almost 50 of them, or manually patch dex2jar to ignore type mismatches. Patching one Java tool in a few places sounded far more attractive than fixing 50-ish issues in an apk, but first I wanted to look for an alternative to dex2jar.

**jadx** proved to be a more reliable option for decompling. It failed in some places as well, but it decompiled what it could, which proved more than enough.

Good old grep had no problem finding the certificate pinning code in the latest version:

```./sources/ch/tutti/network/OkHttp3Stack.java:            builder.certificatePinner(new CertificatePinner.Builder().add(StringsKt.drop("https://api.tutti.ch", 8), new String[]{"sha256/J7536VlsF7Ml/nE9dl90/4O221R7sDASpcasfnohYi8="}).build());```

Further inspection of the file revealed a fairly simple piece of code:

```
        request = BuildConfig.IS_PINNING_ENABLED;
        Intrinsics.checkExpressionValueIsNotNull(request, "BuildConfig.IS_PINNING_ENABLED");
        if (request.booleanValue() != null) {
            builder.certificatePinner(new CertificatePinner.Builder().add(StringsKt.drop("https://api.tutti.ch", 8), new String[]{"sha256/J7536VlsF7Ml/nE9dl90/4O221R7sDASpcasfnohYi8="}).build());
        }
```

and finally an even simpler config file:

```
package ch.tutti;

public final class BuildConfig {
    public static final Boolean IS_PINNING_ENABLED = Boolean.valueOf(true);
}
```

Something this simple should be easy to alter in the smali file, an intermediate assembly-like form of java code that stands in between java and bytecode, something I'd only learned of while hacking the Tutti app. And truly, back to apkstudio, and the smali file is simple to read as well:

```
.class public final Lch/tutti/BuildConfig;
.super Ljava/lang/Object;
.source "BuildConfig.java"


# static fields
.field public static final IS_PINNING_ENABLED:Ljava/lang/Boolean;


# direct methods
.method static constructor <clinit>()V
    .locals 1

    const/4 v0, 0x1

    .line 21
    invoke-static {v0}, Ljava/lang/Boolean;->valueOf(Z)Ljava/lang/Boolean;

    move-result-object v0

    sput-object v0, Lch/tutti/BuildConfig;->IS_PINNING_ENABLED:Ljava/lang/Boolean;

    return-void
.end method
```

A simple change of the v1 const to 0x0, rebuild, reinstall, and voila, the config constant was set to false and certificate pinning disabled. Charles was successfully proxying the requests and spilling Tutti's beans.

### The Folly

My spirits sank a little. Going into my Tutti homework code to replace the API urls, I realized I've already been using the correct ones. My assumpion that they gave me a mock API was wrong. Well, at least it was fun and I got the API key from the mobile app, a good thing since it's likely that my old one has been nuked.

### TL;DR

Steps taken:

1. Set up a proxy to monitor requests
2. Altered the apk to accept custom certificates.
3. Altered the apk to disable explicit certificate pinning.

Tools used:

* mitmproxy - Preferred choice at first sight but replaced with Charles Proxy
* Charles Proxy - a proxy used to monitor http requets
* dex2jar - A tool used to decompile code from an apk or dex file into java code
* jadx - A more fault tolerant alternative to dex2jar
* apkstudio - A lightweight apk editor


## The PWA

**WIP**