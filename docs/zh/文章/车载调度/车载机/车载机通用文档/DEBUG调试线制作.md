---
sidebar: heading
prev:
  text: ''
  link: ''
next:
  text: ''
  link: ''
---

# **DEBUG调试线制作**

## **1、DEBUG口定义** 

![车载机debug接口](/articles/DEBUG调试线制作/车载机debug接口.png )

<table>
  <tbody>
    <tr>
      <td rowspan="4" style='width: 20%'>
        <p style="text-align: center">DEBUG调试口</p>
      </td>
      <td>
        1脚
      </td>
      <td>
        串口RXD（收）
      </td>
    </tr>
    <tr>
      <td style='width: 40%'>
        2脚
      </td>
      <td style='width: 40%'>
        空
      </td>
    </tr>
    <tr>
      <td>
        3脚
      </td>
      <td>
        串口TXD（发）
      </td>
    </tr>
    <tr>
      <td>
        4脚
      </td>
      <td>
        地
      </td>
    </tr>
  </tbody>
</table>

## **2、转接线制作**

![RS232串口定义](/articles/DEBUG调试线制作/RS232串口定义.png )

![RS232串口定义2](/articles/DEBUG调试线制作/RS232串口定义2.png )

DB9接口主要用到的是`2、3、5`引脚。其中：

* `2`脚为RXD（接收数据）

* `3`脚为TXD（发送数据）

* `5`脚为GND（信号地线）

接线定义：

* DB9的 `5` 脚连接到DEBUG的接口对应四芯接插件的 `4` 脚；

* DB9的 `2` 脚连接到DEBUG的接口对应四芯接插件的 `3` 脚；

* DB9的 `3` 脚连接到DEBUG的接口对应四芯接插件的 `1` 脚；

## **3、串口线测试**

把做好的串口转接线、电脑上的串口和车载机的DEBUG接口连接起来，打开串口软件进行设置，例如：`MobaXterm.exe`（`XSHELL`也可以）。

.![MobaXterm](/articles/DEBUG调试线制作/MobaXterm.png =300x)

![串口数据软件设置](/articles/DEBUG调试线制作/串口数据软件设置.png )

![串口数据](/articles/DEBUG调试线制作/串口数据.png )

有打印输出说明制作的串口转接线是正常的。

注意：如果设备上电后，没有用日志打印输出，可以检查一下是不是转接线的接收与发送是不是接反了，可以反过来接再测试一下。