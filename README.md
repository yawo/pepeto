# Welcome to Pepeto Games
===
[![Build Status](https://travis-ci.org/yawo/pepeto.svg?branch=master)](https://travis-ci.org/yawo/pepeto)
Games can be played at [games.donpepeto.com](http://games.donpepeto.com/).

## Why another game project ?
For fun, for algorithmic, for javascript learning, for Open source !

## Want to contribute ?
Just install your env and contact [Yawo Guillaume KPOTUFE](ma.linkedin.com/pub/yawo-guillaume-kpotufe/4b/a91/571/) to add you to the projet collaborators here on github.

### Install environment tools


1. [Install](http://www.vagrantup.com/downloads)  Vagrant
2. [Install](https://www.virtualbox.org/wiki/Downloads%20)  VirtualBox platform packages
3. [Install](http://download.virtualbox.org/virtualbox/4.3.10/Oracle_VM_VirtualBox_Extension_Pack-4.3.10-9%203012.vbox-extpack)  VirtualBox Extension Pack    (double-click on the file)
4. [Install](https://bitbucket.org/kpotufe_guillaume/pepeto-games/downloads/ActiveState.Komodo.IDE.v8.rar)  Komodo IDE (optional. Webstorm or any other IDE may be used. **Cracking is not legal !**)
5. [Install](https://code.google.com/p/msysgit/)  MsysGit (optional, for git on windows; install all binaries)
6. [Install](https://www.google.com/intl/fr/chrome/browser/)  Chrome/Firefox (optional)

**To activate Komodo**: Disconnect your PC from internet,Install Setup, click Keygen.

*All others tools will be in the [vagrant Virtual box](https://github.com/yawo/pepeto/wiki/Vagrant-box-content)
 and synchronized accross all the team.*

### Configuring the tools
1. [Create](https://vagrantcloud.com/account/new) a vagrant cloud account.
2. Open a shell (msysgit for windows)
3. Create ssh key for bitbucket (keep typing Enter til the end)
   ```
   $ ssh-keygen
   ``` 
4. Connect to bitbucket and copy paste the id_rsa.pub content. [help here](https://confluence.atlassian.com/display/BITBUCKET/Set+up+SSH+for+Git)
5. Create the Environment folder (where files and vagrant will be). **$PEPETO_HOME** will refer to this folder
```
$ cd $PEPETO_HOME
$ git clone https://git@github.com/yawo/pepeto.git
$ cd pepeto
$ vagrant up
$ vagrant ssh
$ ln -s /vagrant/code code 
$ cd code
$ npm install
$ npm rebuild
```

### Develop
To start developping, open the folder *code* in your favorite editor on your computer. 
To start the server (localhost:3000) in developper mode, execute ```grunt``` in the *code* folder.
To destroy the vagrant vm, just do 'vagrant destroy'.

### Test 
We will use Karma for tests. more on this soon.

### Deploy
Deployment will be on Heroku.

### Update Github usually
We will Scrum ! Let's get issues, tasks and wiki up to date.

## Contributors
* [Yawo Guillaume KPOTUFE](ma.linkedin.com/pub/yawo-guillaume-kpotufe/4b/a91/571/)

Have fun! any question ? mcguy2008 -NOSPAM- gmail
