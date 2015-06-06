// Update the content of the server status page

$(document).ready(function () {
    // last pulled
    var re_lastpull = /\d\d\:\d\d\:\d\d/;

    // temperature
    var re_temp = /CPU\: ([\d\.]+)/;

    // cpu load
    var re_cpu_load = /CPU load\: ([\d]+\.[\d]+\%)/;

    // network stats
    var re_net_stat_down = /down\: ([\d]+\.[\d]+ [\w]+)\b/m;
    var re_net_stat_up = /up\: ([\d]+\.[\d]+ [\w]+)\b/m;

    // memory stats
    var re_mem = /Mem\:[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)/i
    var re_buffer_cache = /\-\/\+ buffers\/cache\:[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)/i
    var re_swap = /Swap\:[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)/i

    // drive stats
    var re_sda1 = /\/dev\/sda1[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+[\d]+%/i
    var re_sdb2 = /\/dev\/sdb2[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+[\d]+%/i
    var re_sdc2 = /\/dev\/sdc2[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+[\d]+%/i
    var re_total = /total[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+([\d\,]+\w)[\s]+[\d]+%/i

    $.get("status.txt", function (data) {
        // uptime
        var uptime = re_lastpull.exec(data);
        $("#uptime").text(uptime[0]);

        // temperature
        var temp = re_temp.exec(data);
        $("#temp").text(temp[1]);

        // cpu_load
        var cpu_load = re_cpu_load.exec(data);
        $("#cpu_load").text(cpu_load[1]);
        $("#cpu_progress").css("width", cpu_load[1]);

        // network statistics
        var net_stat_down = re_net_stat_down.exec(data);
        var net_stat_up = re_net_stat_up.exec(data);
        $("#network_down").text(net_stat_down[1]);
        $("#network_up").text(net_stat_up[1]);

        // memory
        var mem = re_mem.exec(data);
        $("#mem_total").text(mem[1]);
        $("#mem_used").text(mem[2]);
        $("#mem_free").text(mem[3]);
        $("#mem_shared").text(mem[4]);
        $("#mem_buffers").text(mem[5]);
        $("#mem_cache").text(mem[6]);

        // buffers/cache
        var buffer_cache = re_buffer_cache.exec(data);
        $("#bc_used").text(buffer_cache[1]);
        $("#bc_free").text(buffer_cache[2]);

        $("#mem_prog").text(buffer_cache[1])
        $("#mem_progress").attr("style", "width:" + String(Number((buffer_cache[1].replace("M", "") / 15706) * 100) + "%"));

        // swap
        var swap = re_swap.exec(data);
        $("#swap_total").text(swap[1]);
        $("#swap_used").text(swap[2]);
        $("#swap_free").text(swap[3]);

        // drive stats
        var sda1 = re_sda1.exec(data);
        var sdb2 = re_sdb2.exec(data);
        var sdc2 = re_sdc2.exec(data);
        var total = re_total.exec(data);

        // sda1
        $("#sda_total").text(sda1[1]);
        $("#sda_used").text(sda1[2]);
        $("#sda_free").text(sda1[3]);

        // sdb2
        $("#sdb_total").text(sdb2[1]);
        $("#sdb_used").text(sdb2[2]);
        $("#sdb_free").text(sdb2[3]);

        // sdc2
        $("#sdc_total").text(sdc2[1]);
        $("#sdc_used").text(sdc2[2]);
        $("#sdc_free").text(sdc2[3]);

        // total
        $("#t_total").text(total[1]);
        $("#t_used").text(total[2]);
        $("#t_free").text(total[3]);

        // title
        document.title = temp[1] + "°C | CPU: " + cpu_load[1];
    });
});

// Reload the page every 30 seconds.
window.setInterval(function () {
    window.location = "status.html";
}, 30000)
