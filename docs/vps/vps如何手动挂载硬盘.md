## 大盘鸡如何手动挂载硬盘

## 1. 检查VPS机器的硬盘

使用`fdisk -l`检查机器的硬盘信息
在输出的信息找到准备挂载的硬盘，可以根据容量判断，我这里以 `/dev/sda` 为例

```
Disk /dev/sda: 4.88 TiB, 5368709120000 bytes, 10485760000 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
```

## 2. 安装parted进行分区

因为fdisk没办法对大于2T的硬盘进行分区，所以使用
`apt install parted`

## 3. parted分区

```
parted /dev/sda
GNU Parted 3.5
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.

(parted) print
Error: /dev/sda: unrecognised disk label
```

使用 `print` 命令查看硬盘容量
然后使用 `mklabel gpt` 写入UUID等信息

```
(parted) mklabel gpt

(parted) print
Model: Unknown (unknown)
Disk /dev/sda: 5369GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
```

继续使用 `mkpart primary 0GB 5369GB` 创建分区，这里的容量根据上面硬盘的大小自行输入，这里的5369GB只是作为例子
再次 `print` 检查

```
(parted) print
Model: QEMU QEMU HARDDISK (scsi)
Disk /dev/sda: 5369GB
Sector size (logical/physical): 512B/512B
Partition Table: gpt
Disk Flags:

Number  Start   End     Size    File system  Name     Flags
 1      1049kB  5369GB  5369GB  ext4         primary
```

没有问题就可以 `quit` 退出parted

## 4. 使用`fdisk -l`检查机器的硬盘信息

可以看到 /dev/sda1 分区已经创建

```
Device     Start         End     Sectors  Size Type
/dev/sda1   2048 10485757951 10485755904  4.9T Linux filesystem
```

## 5. 格式化

```
mkfs.ext4 /dev/sda1
```

## 6. 创建挂载目录，挂载数据盘

```
mkdir /data
mount /dev/sda1 /data
```

## 7. 自动挂载硬盘（失败-导致机器进入emergency mode)

```
echo '【/dev/sda1的UUID】 /data ext4 defaults 0 0' >> /etc/fstab
```

【/dev/sda1的UUID】根据刚刚使用`fdisk -l`查看复制，自行输入

## 8. 查看挂载是否生效

`df -h` 是否有大硬盘/dev/sda1 的信息
查看自动挂载是否生效
`cat /etc/fstab` 是否有/dev/sda 的UUID那一行