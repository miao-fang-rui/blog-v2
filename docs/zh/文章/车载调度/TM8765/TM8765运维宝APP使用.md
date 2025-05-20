---
sidebar: heading
prev:
  text: 无
  link: 无
next:
  text: 无
  link: 无
---

# 运维宝APP使用

## 一、APP下载

| app名称 | 图片 | 下载地址 |
| --- | --- | --- |
| 运维宝 | ![运维宝APP.png](/articles/TM8765运维宝APP使用/运维宝APP.png =60x56) | [点击下载](/blog/articles/TM8765运维宝APP使用/运维宝.apk) |

## 二、登陆

| 权限 | 账号 | 密码 |
| --- | --- | --- |
| 售后人员 | 工号 | 123456 |
| 客户 | 需要申请 | 需要申请 |

.

## 三、连接车载机

### 1、打开手机WiFi

![打开手机WiFi.png](/articles/TM8765运维宝APP使用/打开手机WiFi.png =300x)

### 2、使用运维宝APP扫码车载机二维码

#### ①、点击app扫码按钮

![app扫码图标.png](/articles/TM8765运维宝APP使用/app扫码图标.png =300x)

#### ②、扫描车载机二维码

![扫车载机二维码.png](/articles/TM8765运维宝APP使用/扫车载机二维码.png =300x)

#### ③、连接车载机WiFi

![连接车载机wifi.jpg](/articles/TM8765运维宝APP使用/连接车载机wifi.jpg =300x)&nbsp;
![连接车载机成功.png](/articles/TM8765运维宝APP使用/连接车载机成功.png =302x651)

### 3、无显示屏连接车载机

#### ①、使用手机WiFi连接车载机热点

> 针对没有显示屏的车载机，需要先连接车载机的WiFi热点。

#### ②、长按`运维宝`

![长按设置.png](/articles/TM8765运维宝APP使用/长按设置.png =300x)

#### ③、确认ip和端口，建立链接

> 点击`建立链接` 就可以连上车载机。

![设置wifi.png](/articles/TM8765运维宝APP使用/设置wifi.png =300x)

## 四、参数设置

> 连接上车载机后，就可以设置车载机参数了。

### 1、系统

#### ①、文件管理

> 可以将以下文件导入和导出
>
> * 系统参数：
>
>   车载机文件：`/mnt/flash/tm8765_para.db`
>
>   导出：`/手机内部存储/com.tiamaes.tm8765/sysfile/tm8765_para.zip`
>
> * 语音文件：
>
>   车载机文件：`/mnt/nand/bzqmp3/语音文件`
>
>   导出：`/手机内部存储/com.tiamaes.tm8765/voice/bzqmp3.zip`
>
> * 日志文件：
>
>   车载机文件：`/mnt/syslog/日志文件`
>
>   导出：`/手机内部存储/com.tiamaes.tm8765/log/log.zip`

![文件管理.png](/articles/TM8765运维宝APP使用/文件管理.png =300x)

#### ②、存储介质

> 此菜单可以管理所有的存储介质

![存储介质.png](/articles/TM8765运维宝APP使用/存储介质.png =300x)

#### ③、升级管理

> 此菜单可以升级车载机程序。
>
> * 核心板
>
>   升级文件：`手机内部存储 / com.tiamaes.tm8765 / update / coreboard/ update.zip`
>
> * 单片机
>
>   升级文件：` 手机内部存储 / com.tiamaes.tm8765 / update / scm / update_mcu.zip`
>
> * AI
>
>   暂无
>
> * 4G模块
>
>   暂无
>
> * WLAN
>
>   暂无
>
> * GPS
>
>   暂无

![升级管理.png](/articles/TM8765运维宝APP使用/升级管理.png =300x)

#### ④、恢复出厂设置

> * 恢复调度配置参数：恢复车载机参数
>
> * 恢复调度线路参数：线路切换到A1路

![恢复出厂.png](/articles/TM8765运维宝APP使用/恢复出厂.png =300x)

### 2、调度

#### ①、调度服务

> 设置主副调度服务器地址和域名。

![调度服务.png](/articles/TM8765运维宝APP使用/调度服务.png =300x)

#### ②、音量管理

> 设置车载机音量：扬声器、麦克、提示音。

![音量管理.png](/articles/TM8765运维宝APP使用/音量管理.png =300x)

#### ③、定位模式

> 默认，不需要修改。

![定位模式.png](/articles/TM8765运维宝APP使用/定位模式.png =300x)

#### ④、调度管理

> 可设置：报站声音、屏协议类型、发车点参数、厂区参数。

![调度管理.png](/articles/TM8765运维宝APP使用/调度管理.png =300x)

#### ⑤、车辆管理

> 设置车辆自编号。

::: warning 

车牌号可后台下发，机器号禁止修改。

:::

![车辆管理.png](/articles/TM8765运维宝APP使用/车辆管理.png =300x)

#### ⑥、车辆信号管理

> 设置门类型、开门显示通道，倒车显示通道等。

![车辆信号管理.png](/articles/TM8765运维宝APP使用/车辆信号管理.png =300x)

#### ⑦、测试工装

> 测试车载机存储的语音

![测试工装.png](/articles/TM8765运维宝APP使用/测试工装.png =300x)

### 3、视频

#### ①、视频服务

> 设置主副视频服务器地址，域名不需要设置。

![视频服务.png](/articles/TM8765运维宝APP使用/视频服务.png =300x)

#### ②、输入图像

> 可单独设置每个摄像头图像的色彩

![输入图像.png](/articles/TM8765运维宝APP使用/输入图像.png =300x)

#### ③、输出图像

> 设置TM8832显示屏的色彩

![输出图像.png](/articles/TM8765运维宝APP使用/输出图像.png =300x)

#### ④、OSD

> 设置录像视频上的水印信息

![OSD.png](/articles/TM8765运维宝APP使用/OSD.png =300x)

#### ⑤、录像配置

![录像配置.png](/articles/TM8765运维宝APP使用/录像配置.png =300x)

#### ⑥、回放与导出

![回放与导出.png](/articles/TM8765运维宝APP使用/回放与导出.png =300x)

#### ⑦、图像抓拍

![图像抓拍.png](/articles/TM8765运维宝APP使用/图像抓拍.png =300x)

#### ⑧、视频编码

::: warning 

修改前请咨询售后人员。

:::

![视频编码.png](/articles/TM8765运维宝APP使用/视频编码.png =300x)

#### ⑨、系统配置

::: warning 

修改前请咨询售后人员。

:::

![系统配置.png](/articles/TM8765运维宝APP使用/系统配置.png =300x)

#### ⑩、AD配置

::: warning 

修改前请咨询售后人员。

:::

![AD配置.png](/articles/TM8765运维宝APP使用/AD配置.png =300x)

### 4、网络

#### ①、移动数据

> 默认，不需要修改。

![移动数据.png](/articles/TM8765运维宝APP使用/移动数据.png =300x)

#### ②、以太网

> 模式需要修改为`STATIC` ，否则使用IPC接口的设备不能上网。

![以太网.png](/articles/TM8765运维宝APP使用/以太网.png =300x)

#### ③、WLAN

> 默认，不需要修改。

![WLAN.png](/articles/TM8765运维宝APP使用/WLAN.png =300x)

#### ④、路由

> 默认，不需要修改。

![路由.png](/articles/TM8765运维宝APP使用/路由.png =300x)

#### ⑤、NAT

> 默认，不需要修改。

![NAT.png](/articles/TM8765运维宝APP使用/NAT.png =300x)

#### ⑥、流量统计

![流量统计.png](/articles/TM8765运维宝APP使用/流量统计.png =300x)

#### ⑦、GSM通话

![GSM通话.png](/articles/TM8765运维宝APP使用/GSM通话.png =300x)

