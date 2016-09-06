# vue-qrcode-scanner #

## getUserMedia ##
webapp内调用HTML5 getUserMedia API的前提是当前的网络协议为https,故需要搭建一个https的nodejs服务器。<br>
参考链接：<br>[https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins](https://sites.google.com/a/chromium.org/dev/Home/chromium-security/deprecating-powerful-features-on-insecure-origins)

## TLS、SSL、HTTPS以及证书 ##
TLS是传输层安全协议，是一种基于网络传输的加密协议，可以在受信任的第三方公正基础上做双方的身份验证。TLS可以用在TCP上，也可以用在无连接的UDP报文上。协议规定了身份认证、算法协商、密钥交换等的实现。<br>
SSL是TLS的前身，现在已经不更新<br>
HTPPS是基于TLS/SSL的安全套接字上的应用协议，除了传输层进行了加密外，与其它常规HTTP协议一样基本保持一致<br>
证书是TLS协议中用来对身份进行验证的机制，是一种签名形式的文件，包含证书拥有者的公钥及第三方证书的信息。证书分为两类：自签名证书和CA证书。一般自签名证书不能用来进行身份认证，如果一个server端使用自签名证书，client端要么被设置为无条件信任任何证书，要么需要将自签名证书的公钥和私钥加入受信任列表。如果这样server的私钥存在被泄露的风险。<br>
### TLS基于CA的身份验证基本原理 ###
1. 首先验证方需要受信任CA提供方自己的证书（CAcert），比如证书在操作系统中的受信任列表中，或者用户通过安装根证书等方式将CA的公钥和私钥加入受信任列表；
2. 然后CA对被验证方的原始证书进行签名（私钥加密），生成最终的证书；
3. 验证方的得到最终的证书后，利用CAcert中包含的公钥进行解密，得到被验证方的原始证书。<br>
4. 根据RAS的加密原理，如果CA的公钥解密成功，说明该证书的确是用CA的私钥加密的。可以被认证为可信的。<br>
### 生成证书 ###
使用openssl生成证书,如果没有openssl需要安装具体安装步骤如下：<br>
[http://blog.chinaunix.net/uid-20479991-id-216269.html](http://blog.chinaunix.net/uid-20479991-id-216269.html)<br>
如果已经安装过git的话openssl便已经安装好了，可以通过`git --version` 及 `openssl verison -a` 
检查openssl是否安装成功。
![](http://i.imgur.com/b05Zvrn.png)

1. 生成私钥key文件 `openssl genrsa -out privatekey.pem 1024`
![](http://i.imgur.com/D2tTuPz.png)

2.  通过私钥生成CSR证书签名 `openssl req -new -key privatekey.pem -out certrequest.csr` <br>
这里需要注意的是单一命令输入后会报如下错误,该错误产生原因为在unix系统上，根据路径寻找`/usr/local/ssl/openssl.cnf`，但在windows系统中改路径不存在，应该手动指定openssl.conf文件。git的安装文件中存在openssl.cnf<br>
![](http://i.imgur.com/K2bH5Ve.png)
![](http://i.imgur.com/rIN9OUi.png)<br>

3. 通过私钥和证书签名生成证书文件  `openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem`
![](http://i.imgur.com/bNVMzBq.png)<br>

新生成了3个文件：certificate.pem, certrequest.csr, privatekey.pem,其中.pem文件供app.js 使用。

## pc浏览器调试mobile浏览器 ##
### 前提 ###
1. 手机端chrome for android
2. pc端chrome浏览器（版本较新的）
3. USB连接线

### 步骤 ###

1. 手机端开启开发者模式及USB调试模式
2. 如果当前电脑内关于对应mobile的驱动没有安装好，进入当前链接下载对应手机的驱动  [https://developer.android.com/studio/run/oem-usb.html#Drivers](https://developer.android.com/studio/run/oem-usb.html#Drivers) 
3. 驱动安装完毕后打开pc端浏览器输入 `chrome://inspect/#devices`  勾选 `Discover USB devices` 。正常的情况下mobile会有弹层通知确认是否启动USB手机调试，点击确认后 `chrome://inspect/#devices` 页面会显示已链接的设备及正在开启的页面。

具体详情可以参考<br>
[http://blog.csdn.net/shenlei19911210/article/details/48690685](http://blog.csdn.net/shenlei19911210/article/details/48690685)




