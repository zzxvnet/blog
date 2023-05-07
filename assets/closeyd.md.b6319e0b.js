import{_ as s,o as a,c as n,O as l}from"./chunks/framework.9482e208.js";const g=JSON.parse('{"title":"阿里云ECS关闭删除安骑士","description":"","frontmatter":{},"headers":[],"relativePath":"closeyd.md","filePath":"closeyd.md"}'),p={name:"closeyd.md"},e=l(`<h1 id="阿里云ecs关闭删除安骑士" tabindex="-1">阿里云ECS关闭删除安骑士 <a class="header-anchor" href="#阿里云ecs关闭删除安骑士" aria-label="Permalink to &quot;阿里云ECS关闭删除安骑士&quot;">​</a></h1><p>阿里云 ECS 默认自动安装了阿里云盾（安骑士）的 WAF 防火墙，这个云盾基本是没有用的，唯一的用处就是记录一些所谓的漏洞、扫描/注入攻击以便在阿里云后台提示用户购买使用收费版“安骑士”服务。可以说这玩意儿除了是阿里云营销“套路”调用获取数据外基本没有什么用的，摆设的感觉非常强烈。删！</p><p>阿里云ECS关闭删除安骑士 Linux 服务器运维人员，都有一定程度的“洁癖”，既然是没有卵用的东西，自然就要关停掉，作为一个常驻后台的进程始终给人的感觉怪怪的。</p><p>其实已经注意这货很久了，以前是担心会对阿里云服务有影响，后来发现仅仅是个摆设而已，所以就度娘、谷哥一番关闭这货。</p><p>不搜索不知道，竟然有那么多站长们都已经关闭和清除阿里云盾（安骑士）了，并且好像方法还有好多种呢。</p><p>方法1：aliyun官方方法 阿里云云盾管理页面：<a href="https://yundun.console.aliyun.com/?p=aqs#/aqs/settings/setInstall" target="_blank" rel="noreferrer">https://yundun.console.aliyun.com/?p=aqs#/aqs/settings/setInstall</a></p><p>阿里云官网手动卸载：<a href="https://help.aliyun.com/document_detail/31777.html" target="_blank" rel="noreferrer">https://help.aliyun.com/document_detail/31777.html</a></p><p>1、卸载阿里云盾监控</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">wget http://update.aegis.aliyun.com/download/uninstall.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">sh uninstall.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">wget http://update.aegis.aliyun.com/download/quartz_uninstall.sh</span></span>
<span class="line"><span style="color:#A6ACCD;">sh quartz_uninstall.sh</span></span></code></pre></div><p>2、删除残留</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">pkill aliyun-service</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /etc/init.d/agentwatch /usr/sbin/aliyun-service</span></span>
<span class="line"><span style="color:#A6ACCD;">rm -rf /usr/local/aegis*</span></span></code></pre></div><p>3、 卸载云监控Java版本插件： 云监控Java版本插件： <a href="https://help.aliyun.com/knowledge_detail/38859.html#h2-url-4" target="_blank" rel="noreferrer">https://help.aliyun.com/knowledge_detail/38859.html#h2-url-4</a></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">sudo /usr/local/cloudmonitor/wrapper/bin/cloudmonitor.sh stop</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo /usr/local/cloudmonitor/wrapper/bin/cloudmonitor.sh remove</span></span>
<span class="line"><span style="color:#A6ACCD;">sudo rm -rf /usr/local/cloudmonitor</span></span></code></pre></div><p>4、屏蔽云盾 IP</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.201.0/28 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.201.16/29 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.201.32/28 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.192/29 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.200/30 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.184/29 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.183/32 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.206/32 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.205/32 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.195/32 -j DROP</span></span>
<span class="line"><span style="color:#A6ACCD;">iptables -I INPUT -s 140.205.225.204/32 -j DROP</span></span></code></pre></div><p>方法2：使用chkconfig</p><p>使用 chkconfig –list 查看开机启动里面这个软件的服务名是什么，然后 off 掉 aegis 执行就可以了。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">chkconfig –list</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>aegis 0:off 1:off 2:on 3:on 4:on 5:on 6:off</p><p>agentwatch 0:off 1:off 2:on 3:on 4:on 5:on 6:off</p><p>cloudmonitor 0:off 1:off 2:on 3:on 4:on 5:on 6:off</p><p>mysql 0:off 1:off 2:off 3:off 4:off 5:off 6:off</p><p>netconsole 0:off 1:off 2:off 3:off 4:off 5:off 6:off</p><p>network 0:off 1:off 2:on 3:on 4:on 5:on 6:off</p></div><p>如果想开机不启动的话，chkconfig –del aegis 这个 aegis 就是你找出来的 aliyundun 的后台服务。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">service aegis stop</span></span>
<span class="line"><span style="color:#A6ACCD;">chkconfig --del aegis</span></span></code></pre></div><p>方法3：手动kill相关进程</p><p>阿里云服务器查杀关闭云盾进程</p><p>查杀关闭云盾进程处理过程如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ps -ef | grep -v grep | grep -i aliyundun</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>root 18779 1 0 12:33 ? 00:00:00 /usr/local/aegis/aegis_update/AliYunDunUpdate</p><p>root 18832 1 0 12:33 ? 00:00:01 /usr/local/aegis/aegis_client/aegis_10_39/AliYunDun</p></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ps -ef | grep -v grep | grep -i aliyundun | awk &#39;{print $2}&#39;</span></span></code></pre></div><div class="info custom-block"><p class="custom-block-title">INFO</p><p>18779</p><p>18832</p></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">ps -ef | grep -v grep | grep -i aliyundun | awk &#39;{print $2}&#39; | xargs kill -9</span></span></code></pre></div><p>方法4：别的公司用的uninstall.sh 适用centos7</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">#!/bin/bash</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">#check linux Gentoo os </span></span>
<span class="line"><span style="color:#A6ACCD;">var=\`lsb_release -a | grep Gentoo\`</span></span>
<span class="line"><span style="color:#A6ACCD;">if [ -z &quot;\${var}&quot; ]; then </span></span>
<span class="line"><span style="color:#A6ACCD;"> var=\`cat /etc/issue | grep Gentoo\`</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">if [ -d &quot;/etc/runlevels/default&quot; -a -n &quot;\${var}&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;"> LINUX_RELEASE=&quot;GENTOO&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">else</span></span>
<span class="line"><span style="color:#A6ACCD;"> LINUX_RELEASE=&quot;OTHER&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">stop_aegis(){</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 aegis_cli &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 aegis_update &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 aegis_cli &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 AliYunDun &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 AliHids &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;"> killall -9 AliYunDunUpdate &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;">    printf &quot;%-40s %40s\\n&quot; &quot;Stopping aegis&quot; &quot;[  OK  ]&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">remove_aegis(){</span></span>
<span class="line"><span style="color:#A6ACCD;">if [ -d /usr/local/aegis ];then</span></span>
<span class="line"><span style="color:#A6ACCD;">    rm -rf /usr/local/aegis/aegis_client</span></span>
<span class="line"><span style="color:#A6ACCD;">    rm -rf /usr/local/aegis/aegis_update</span></span>
<span class="line"><span style="color:#A6ACCD;"> rm -rf /usr/local/aegis/alihids</span></span>
<span class="line"><span style="color:#A6ACCD;">fi</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">uninstall_service() {</span></span>
<span class="line"><span style="color:#A6ACCD;">   </span></span>
<span class="line"><span style="color:#A6ACCD;">   if [ -f &quot;/etc/init.d/aegis&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">  /etc/init.d/aegis stop  &gt;/dev/null 2&gt;&amp;1</span></span>
<span class="line"><span style="color:#A6ACCD;">  rm -f /etc/init.d/aegis </span></span>
<span class="line"><span style="color:#A6ACCD;">   fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"> if [ $LINUX_RELEASE = &quot;GENTOO&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">  rc-update del aegis default 2&gt;/dev/null</span></span>
<span class="line"><span style="color:#A6ACCD;">  if [ -f &quot;/etc/runlevels/default/aegis&quot; ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">   rm -f &quot;/etc/runlevels/default/aegis&quot; &gt;/dev/null 2&gt;&amp;1;</span></span>
<span class="line"><span style="color:#A6ACCD;">  fi</span></span>
<span class="line"><span style="color:#A6ACCD;">    elif [ -f /etc/init.d/aegis ]; then</span></span>
<span class="line"><span style="color:#A6ACCD;">         /etc/init.d/aegis  uninstall</span></span>
<span class="line"><span style="color:#A6ACCD;">     for ((var=2; var&lt;=5; var++)) do</span></span>
<span class="line"><span style="color:#A6ACCD;">   if [ -d &quot;/etc/rc\${var}.d/&quot; ];then</span></span>
<span class="line"><span style="color:#A6ACCD;">     rm -f &quot;/etc/rc\${var}.d/S80aegis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">      elif [ -d &quot;/etc/rc.d/rc\${var}.d&quot; ];then</span></span>
<span class="line"><span style="color:#A6ACCD;">    rm -f &quot;/etc/rc.d/rc\${var}.d/S80aegis&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">   fi</span></span>
<span class="line"><span style="color:#A6ACCD;">  done</span></span>
<span class="line"><span style="color:#A6ACCD;">    fi</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">stop_aegis</span></span>
<span class="line"><span style="color:#A6ACCD;">uninstall_service</span></span>
<span class="line"><span style="color:#A6ACCD;">remove_aegis</span></span>
<span class="line"><span style="color:#A6ACCD;">umount /usr/local/aegis/aegis_debug</span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;"></span></span>
<span class="line"><span style="color:#A6ACCD;">printf &quot;%-40s %40s\\n&quot; &quot;Uninstalling aegis&quot;  &quot;[  OK  ]&quot;</span></span></code></pre></div><p>删除阿里云登录界面欢迎信息</p><div class="info custom-block"><p class="custom-block-title">INFO</p><p>Welcome to Ubuntu 17.04 (GNU/Linux 4.10.0-19-generic x86_64)</p><ul><li>Documentation: <a href="https://help.ubuntu.com" target="_blank" rel="noreferrer">https://help.ubuntu.com</a></li><li>Management: <a href="https://landscape.canonical.com" target="_blank" rel="noreferrer">https://landscape.canonical.com</a></li><li>Support: <a href="https://ubuntu.com/advantage" target="_blank" rel="noreferrer">https://ubuntu.com/advantage</a> Welcome to Alibaba Cloud Elastic Compute Service ! Last login from</li></ul></div><p>就莫名的不爽，于是查了一下 vim /etc/motd</p><p>就可以编辑/删除倒数第二行的 Welcome to Alibaba Cloud Elastic Compute Service ! 欢迎信息了。</p>`,35),o=[e];function t(c,i,r,C,u,A){return a(),n("div",null,o)}const y=s(p,[["render",t]]);export{g as __pageData,y as default};
