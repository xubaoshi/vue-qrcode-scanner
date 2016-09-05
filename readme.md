# js-qrcode-scanner #

## getUserMedia ##
webapp内调用getUserMedia方法的前提是当前的网络协议为https,故需要搭建一个https的nodejs服务器。<br>
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




