# NGINX

<code>It looks like you might be referring to Nginx (pronounced "engine-x"), a popular open-source software for web serving, reverse proxying, caching, load balancing, and more.</code>

### 1. Web Server:

Nginx can serve static content (like HTML, images, CSS, JavaScript files) very efficiently. It’s designed to handle many concurrent connections, making it highly scalable for serving websites with high traffic.

### 2. Reverse Proxy:

Nginx can act as a reverse proxy server, meaning it forwards client requests to other servers, typically web application servers like Apache, Tomcat, or others.
It helps in load balancing, handling requests more efficiently by distributing them among multiple backend servers.

### 3. Load Balancer:

It can be configured to distribute traffic among multiple servers to ensure that no single server gets overwhelmed, improving both performance and reliability.
Supports multiple load balancing methods (round-robin, least connections, etc.).

### 4. HTTP Cache:

Nginx has caching capabilities to speed up response times by storing and serving frequently requested resources directly from memory or disk.

### 5. SSL/TLS Termination:

Nginx can be used to handle SSL/TLS encryption/decryption, offloading this from the backend servers. This helps in improving performance and simplifying certificate management.

### 6. Content Delivery Network (CDN):

It can be configured to act as a CDN to distribute content globally by caching static content closer to users.

## NGINX Installation

### Installation on macOS (Using Homebrew):

**Step 1: Install Homebrew (If not installed)**

If you don’t have Homebrew installed, first install it by running this command in the terminal:

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

**Step 2: Install Nginx via Homebrew**

Once Homebrew is installed, you can install Nginx with the following command:

```
brew install nginx
```

**Step 3: Start Nginx**

To start Nginx immediately:

```
sudo nginx
```

To stop it:

```
sudo nginx -s stop
```

**Step 4: Verify Installation**

<code>
Open a web browser and go to http://localhost:8080 (default port for Nginx on macOS via Homebrew). You should see the Nginx welcome page.</code>

## Installation on Windows (via WSL or native Windows installation)

<code>
For Windows, it's common to use WSL (Windows Subsystem for Linux) to run Nginx in a Linux environment on Windows. Alternatively, you can use pre-built Windows binaries for Nginx, but these are less common for production environments.
</code>

### WSL Installation:

Install WSL (Ubuntu or another distro) from the Microsoft Store.
Follow the Ubuntu installation steps for installing Nginx.

**Native Installation (Windows):**

Download Nginx: Visit the official Nginx download page for Windows.
Extract the files to a directory (e.g., C:\nginx).
Run Nginx:Open a command prompt in the Nginx directory and type:

```
 nginx
```

By default, Nginx will start on port 80.

## Post-Installation: Configure Nginx

After installation, you may need to modify the configuration file:

The main Nginx configuration file is located at:

```
- Ubuntu/Debian: /etc/nginx/nginx.conf
- CentOS/RHEL: /etc/nginx/nginx.conf
- macOS (Homebrew): /usr/local/etc/nginx/nginx.conf
```

Common tasks you may want to perform:

```
Edit the configuration to set server blocks (virtual hosts).
- Configure SSL/TLS for secure connections.
- Set up reverse proxy or load balancing.
- Enable or disable modules as required.
```

After making changes to the configuration file, restart Nginx:

```
sudo systemctl restart nginx   # On Linux
sudo nginx -s reload          # On macOS (Homebrew)
```

## Troubleshooting

If Nginx doesn’t start or fails to work, check the logs for errors:

- Linux: /var/log/nginx/error.log
- macOS/Homebrew: /usr/local/var/log/nginx/error.log

Test the configuration for syntax errors before restarting:

```
sudo nginx -t
```

That's it! You should now have Nginx installed and running on your system.

**To see all the nginx process**
```
ps aux | grep nginx
```

**To quit all processes**
```
sudo pkill -QUIT nginx  
```
