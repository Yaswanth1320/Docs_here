### To see what processes are running in a port

**1.Find the Process ID (PID) using the Port:**

You can use lsof (list open files) to find the PID of the process that is using a specific port. Replace PORT_NUMBER with the port you want to check (e.g., 3000).

```
lsof -i :PORT_NUMBER
```

This will show you details about the process using the port, including the PID. It will look something like this:

```
COMMAND   PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
node    12345 user   22u  IPv4  0x1234      0t0  TCP *:3000 (LISTEN)
```

**2. Kill the Process:**

Once you have the PID, you can use the kill command to stop the process.

```
kill -9 PID
```

The -9 flag forces the process to terminate immediately.

## For Windows:

Find the Process ID (PID) using the Port:

Open Command Prompt (CMD) and use the netstat command to find the PID.

```
netstat -ano | findstr :PORT_NUMBER
```

Example for port 3000:

```
netstat -ano | findstr :3000
```

The output will look something like this:

```
TCP    0.0.0.0:3000            0.0.0.0:0              LISTENING       12345
```

The PID is 12345 in this case.

**2.Kill the Process:**

Once you have the PID, you can stop the process using the taskkill command.

```
taskkill /PID 12345 /F
```

Replace 12345 with the actual PID of the process.

### Create a SSL(self verified):

```
mkdir ssl
cd ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout nginx-selfsigned.key -out nginx-selfsigned.crt
```

This cmd will create a public key and a private key in the ssl folder

### To find the ipaddress of the computer

```
ifconfig
```

If you need only the ip address you can also use
```
ipconfig getifaddr en0
```

### React Native expo go error solution

The problem lies in the ip address of the system not matches with expo go ip address,they should be same to run an expo app.

To fix it here is the solution

**Step-1**
```
echo 'export REACT_NATIVE_PACKAGER_HOSTNAME=(System ip address)' >> ~/.zshrc
source ~/.zshrc  # Apply the changes to your current session
```

**Step-2**

```
echo 'export REACT_NATIVE_PACKAGER_HOSTNAME=172.20.10.11' >> ~/.bash_profile
source ~/.bash_profile  # Apply the changes
```

After this the app should work fine .to check the ip address of expo add use
```
export REACT_NATIVE_PACKAGER_HOSTNAME=172.20.10.11
```

