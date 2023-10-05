# For Install and Configure WSL 2 on Windows 10/11

Open PowerShell as Administrator and run the following commands:

```powershell
wsl install
```

Restart your computer and run the following command to verify that the WSL 2 installation was successful:

```powershell
wsl --list --verbose
```

In case the WSL version is 1, run the following command to update it to version 2:

```powershell
wsl --set-default-version 2
```

Install _Windows Terminal_ from the Microsoft Store.

Open Ubuntu on Windows Terminal and run the following commands:

```bash
sudo apt update && sudo apt upgrade
```

Active the systemd service:

```bash
sudo vim /etc/wsl.conf
```

Add the following lines:

```bash
[boot]
systemd = true
```

Open PowerShell as Administrator and run the following command:

```powershell
wsl --shutdown
```

Install the following packages:

```bash
sudo apt install curl git wget zsh vim python bzip2 unzip
```

Install Oh My Zsh:

```bash
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Install NVM:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Restart your terminal and run the following command to verify that NVM was installed successfully:

```bash
nvm --version
```

Install NodeJS:

```bash
nvm install lts/gallium
```

[Then you can continue with the project installation](../README.md)
