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
<code>
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
</code>


**Step 2: Install Nginx via Homebrew**

Once Homebrew is installed, you can install Nginx with the following command:
<code>
brew install nginx
</code>

**Step 3: Start Nginx**

To start Nginx immediately:
<code>
sudo nginx
</code>

To stop it:
<code>
sudo nginx -s stop
</code>

**Step 4: Verify Installation**

Open a web browser and go to http://localhost:8080 (default port for Nginx on macOS via Homebrew). You should see the Nginx welcome page.