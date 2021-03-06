#!/usr/bin/python

"""A script to get information from MrTijn's new server so I (MrMadsenMalmo) can display it
on a website
"""

__author__ = "MrMadsenMalmo - Fredrik A. Madsen-Malmo & Tijndagamer"

import os
import time
import re
import datetime

def main():
    dataList = []

    dataList.append(os.popen("uptime").read() + "\n")
    dataList.append(os.popen("cpuload").read())
    dataList.append("CPU temp: \n" + os.popen("getcputemp").read())
    dataList.append("Network stats:\n" + os.popen("getdown").read())
    dataList.append(os.popen("getup").read() + "\n")
    dataList.append("Memory stats:\n" + os.popen("free -h").read() + "\n")
    dataList.append("Drive stats:  TOTAL | USED | FREE\n" + os.popen("df -h | grep '/dev/' && df -h --total | grep 'total'").read())

    data = str(dataList)
    data = data.replace('[', '')
    data = data.replace(']', '')
    data = data.replace(',', '')

    # os.popen("echo " + data + " > /var/www/html/status")
    # for data in dataList:
    #     print data

    with open("/var/www/html/status.txt", "w+") as file:
        for data in dataList:
            file.write(data)

    write()


def get_time():
    return re.search("\d\d\:\d\d\:\d\d", os.popen("uptime").read(), re.VERBOSE).group(0) + "\n"

def get_load():
    return re.search("CPU\sload\:\s([\d\.]+\%)", os.popen("cpuload").read(), re.VERBOSE).group(1) + "\n"

def get_temp():
    return re.search("[\w]+\:\s([\d\.]+)", os.popen("getcputemp").read(), re.VERBOSE).group(1) + "C\n"

def write(time=""):
    for type in [["temp", get_temp], ["load", get_load]]:
        with open(type[0] + time + ".txt", "a+") as file:
            if time == 'day':
                file.write(str(datetime.datetime.today()).split(' ')[0] + type[1])
            else:
                file.write(get_time() + type[1]())

prev_time = get_time()
prev_day = datetime.datetime.today().day

while True:
    # minute change
    if get_time()[3:5] != prev_time[3:5]:
        write("min")

    # hour change
	if get_time()[0:2] != prev_time[0:2]:
	    write("hr")

    # day change
    if datetime.datetime.today().day != prev_day:
        write("day")

    main()

    prev_time = get_time()
    prev_day = datetime.datetime.today().day

    time.sleep(5)
