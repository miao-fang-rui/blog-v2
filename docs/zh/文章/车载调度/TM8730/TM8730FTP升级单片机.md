---
sidebar: heading
prev:
  text: 无
  link: 无
next:
  text: 无
  link: 无
---

# TM8730 FTP升级单片机

## 一、程序文件说明

| 文件 | 说明 |
| --- | --- |
| TM8730_VXXXX.bin | 后台和U盘升级使用，重命名为`TM8730_STM32_APP` |
| TM8730_VXXXX.hex | isp线刷使用 |

## 二、FTP升级包说明

```
8730-版本号-update.zip
    └─ update  ------------------------------ 文件夹
        ├─ mcu_update ----------------------- 空文件，升级必须存在
        └─ data ----------------------------- 文件夹
             └─TM8730_STM32_APP ------------- 单片机程序，名字必须是TM8730_STM32_APP
```