# MMR Calculator
[![HitCount](http://hits.dwyl.io/austinleath/mmrcalculator.svg)](http://hits.dwyl.io/austinleath/mmrcalculator)
[![Github Releases](https://img.shields.io/github/downloads/AustinLeath/mmrcalculator/total.svg)](https://img.shields.io/github/downloads/AustinLeath/mmrcalculator/total.svg)
[![DependenciesChecker](https://david-dm.org/austinleath/mmrcalculator.svg)](https://david-dm.org/austinleath/mmrcalculator)

If you can't use GitHub, you can use other providers:

- [Complete electron-updater HTTP example](https://gist.github.com/iffy/0ff845e8e3f59dbe7eaf2bf24443f104)
- [Complete electron-updater from gitlab.com private repo example](https://gist.github.com/Slauta/5b2bcf9fa1f6f6a9443aa6b447bcae05)

**NOTE:** If you want to run through this whole process, you will need to fork this repo on GitHub and replace all instances of `iffy` with your GitHub username before doing the following steps.

1. For macOS, you will need a code-signing certificate.

    Install Xcode (from the App Store), then follow [these instructions](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html#//apple_ref/doc/uid/TP40012582-CH31-SW6) to make sure you have a "Mac Developer" certificate.  If you'd like to export the certificate (for automated building, for instance) [you can](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/AppDistributionGuide/MaintainingCertificates/MaintainingCertificates.html#//apple_ref/doc/uid/TP40012582-CH31-SW7).  You would then follow [these instructions](https://github.com/electron-userland/electron-builder/wiki/Code-Signing).
