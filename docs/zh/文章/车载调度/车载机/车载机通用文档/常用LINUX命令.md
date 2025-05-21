---
sidebar: heading
prev:
  text: 无
  link: 无
next:
  text: 无
  link: 无
---

# 常用LINUX命令

## 1、查看所有网络连接

```bash
netstat -anpt
```

## 2、查看网口连接过的设备

```bash
arp -a
```

## 3、查看当前文件夹下的所有文件

```bash
ls -lh
```

## 4、查看日志

```bash
# av日志 ：/tmp/av_dbg.txt ；/mnt/nand/log/av.txt； /mnt/log/av.txt
cat /tmp/av_dbg.txt | more
cat /mnt/nand/log/av.txt | more
# rslog日志:  
cat /mnt/nand/rslog | more
```

## 5、截屏命令 

```bash
# TM8721 / TM8732 / TM8760
gsnap fb.jpg /dev/fb0

# TM8732N
# 截图格式为jpg文件格式
xcsnap /mnt/nand/fb1.jpg /dev/fb1
# 截图格式为png文件格式
xcsnap /mnt/nand/fb2.png /dev/fb1

```

## 6、8731远程格式化nand

```bash
# 1、先确定nand分区位置
mount
# 2、格式化命令
flash_eraseall /dev/mtd11
flash_eraseall /dev/mtd8
```

![8731远程格式化nand](/articles/常用LINUX命令/8731远程格式化nand.png )

## 7、上传和下载命令

```bash
############################################################################
# FTP上传命令
ftpput -u wenan -p wagj123 42.228.14.82 -P 14141 fb-1101.jpg

# ***************************************************************** #

# FTP下载命令
# 1、不带文件路径：
ftpget -u wenan -p wagj123 42.228.14.82 -P 14141 tcpdump.8731
# 2、带文件路径的下载命令
ftpget -u VnKat@3 -p MrFa@e9 111.040.160.254 -P 10400 /mnt/downloads/update_sh.zip /8760_2_0_67/update_sh.zip

############################################################################

# curl 上传命令：
curl ftp://42.228.14.82:14141 -u 'wenan:wagj123' -T 123-log.tar

# curl下载命令：
curl -u 'wenan:wagj123' -O ftp://42.228.14.82:14141/tcpdump.8731
```

## 8、启动车载机FTP命令

```bash
# 如果通过ftp进不到设备上需要输入该命令进行启动ftp
# TM8721 / TM8732 / TM8760
/opt/update/tinyftp -c /mnt/nand &
# TM8732N
tcpsvd -vE 0.0.0.0 21 ftpd -w -v /mnt/nand/
```

## 9、解压缩命令

```bash
# tar命令解释
# -c: 建立压缩档案
# -x：解压
# -t：查看内容
# -r：向压缩归档文件末尾追加文件
# -u：更新原压缩包中的文件

# 将目录里所有jpg文件打包成tar.jpg
tar –czvf jpg.tar *.jpg 

# 解压 tar包
tar –xvf file.tar 

# 解压zip
unzip file.zip 
```

## 10、删除特殊文件

```bash
# ①、查看iNode节点id
ls -i

# ②、按照iNode节点id节点删除元素
find ./ -inum 12345 -exec rm {} -rf \;
find -inum 12345 -delete
```

![删除特殊文件1](/articles/常用LINUX命令/删除特殊文件1.png )

![删除特殊文件2](/articles/常用LINUX命令/删除特殊文件2.png )

![删除特殊文件3](/articles/常用LINUX命令/删除特殊文件3.png )

## 11、查看十六进制文件

```bash
hexdump config.bin -C
```

## 12、权限

```bash
# 可执行权限
chmod +x power
```

## 13、去掉权限卡

```bash
# 权限卡参数：0x90
# 登入车载机，删除/mnt/flash/sch_para.json；
rm /mnt/flash/schedule/sch_para.json -rf
```

## 14、查看视频流配置

```bash
cat /proc/umap/venc
```

## 15、删除指定时间的文件

```bash
# 删除30天内的日志
find /mnt/nand/log/ -type f -mtime +30 -exec rm -f {} \;
```

![删除指定时间的文件](/articles/常用LINUX命令/删除指定时间的文件.png )

