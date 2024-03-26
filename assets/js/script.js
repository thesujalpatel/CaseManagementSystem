fetch("/config")
  .then((response) => response.json())
  .then((config) => {
    var port = config.port;
    var colors = config.colors;

    const background = colors.background;
    const sub_canvas = colors.sub_canvas;
    const canvas = colors.canvas;
    const primary = colors.primary;
    const secondary = colors.secondary;
    const tertiary = colors.tertiary;

    var menu_open = true;

    $(".back").click(function () {
      location.href = document.referrer;
    });
    $(".scroll-top-icon").click(function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // Menu botton animation
    var nevListItems = $(".nev");
    var menubtn = $(".nev-btn");
    menubtn.click(function () {
      if (menu_open) {
        $(".web-name").fadeTo(190, 0).hide(190);
        $(".nev-sec").fadeTo(350, 0).hide(390);
        $(".div").fadeTo(500, 0).hide(500);
        $(".option-title").fadeTo(400, 0).hide();
        nevListItems.animate({ width: "40px" }, 500);
        $(".spacial").show(500).animate({ margin: "0" },500).fadeTo(500, 1);
        $(".nev-btn").removeClass("selected");
        menu_open = false;

        setTimeout(function () {
          $(".logo-img").css({
            width: "25px",
            height: "25px",
          });
          $(".spacial").css({
            "background-color": "transparent",
          });
        }, 500);
      } else {
        $(".spacial")
        .animate({
          margin: "10px 20px 20px 20px",
        })
        .show(500)
        .fadeTo(500, 1)
          .css({ "background-color": background });

        $(".option-title").show(500).fadeTo(500, 1);
        $(".div").show(500).fadeTo(500, 1);
        $(".nev-sec").show(500).fadeTo(500, 1);
        $(".logo-img").animate({
          width: "50px",
          height: "50px",
        });
        $(".nev-btn").addClass("selected");
        nevListItems.animate({ width: "250px" }, 500);
        menu_open = true;

        setTimeout(function () {
          $(".web-name").show(250);
          $(".web-name").fadeTo(500, 1);
        }, 500);
      }
    });
    $(".input").focus(function () {
      $(this).parent().css({ "border-color": secondary });
      $(this).parent().find(".ic").css({ "border-right-color": secondary });
    });
    $(".input").focusout(function () {
      $(this).parent().css({ "border-color": "transparent" });
      $(this).parent().find(".ic").css({ "border-right-color": "transparent" });
    });
    // Operation for edit case
    $("#updatecases").submit(function (event) {
      event.preventDefault();
      var data_array = $(this).serializeArray();
      var data = {};
      $.map(data_array, function (n, i) {
        data[n["name"]] = n["value"];
      });
      var request = {
        url: `http://localhost:${port}/api/cases/${data.id}`,
        method: "PUT",
        data: data,
      };
      $.ajax(request).done(function (response) {
        alert("Data Saved Successfully");
        return (location.href = document.referrer);
      });
    });

    // Operation for delete case
    $(".delete-op").click(function () {
      var id = $(this).attr("data-id");
      var request = {
        url: `http://localhost:${port}/api/cases/${id}`,
        method: "DELETE",
      };
      if (confirm("Do you want to delete this case?")) {
        $.ajax(request).done(function (response) {
          return (location.href = document.referrer);
        });
      }
    });
    $("#addcases").submit(function (event) {
      alert("Case Added Successfully");
    });

    // Signout operation
    $(".signout").click(function () {
      var request = {
        url: `http://localhost:${port}/api/signout`,
        method: "POST",
      };
      if (confirm("Do you want to SignOut?")) {
        $.ajax(request).done(function (response) {
          location.href = "/signin";
        });
      }
    });
    // Print Function
    $(".print").click(function () {
      var printContents = $(".print-content").html();
      var originalContents = $("html").html();
      var a = window.open();
      a.document.write(originalContents);
      a.document.body.classList.add("active-print");
      a.document.body.innerHTML = printContents;
      setTimeout(() => {
        a.print();
        a.close();
      }, 500);
    });

    var url = window.location.href;
    const selected_array = {
      "/": ["", "Case Management System"],
      "/signup": ["", "Sign Up"],
      "/signin": ["", "Sign In"],
      "/dashboard": [".dashboard", "Dashboard"],
      "/appointments": [".appointments", "Appointments"],
      "/cases": [".cases", "Cases"],
      "/attorney": [".attorney", "Attorney"],
      "/features": [".features", "Features"],
      "/ftc": [".ftc", "Forms, Tables & Charts"],
      "/aw": [".aw", "Application & Widgets"],
      "/authentication": [".authentication", "Authentication"],
      "/miscellaneous": [".miscellaneous", "Miscellaneous"],
    };
    for (var key in selected_array) {
      if (url.endsWith(key)) {
        $(selected_array[key][0]).addClass("selected");
        try {
          $("title").text(selected_array[key][1]);
        } catch (e) {}
        $(".page-title").text(selected_array[key][1]);
      }
    }
    var months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setInterval(function () {
      var current = new Date();

      var year = current.getFullYear();
      var month = current.getMonth();
      var date =
        current.getDate().toString().length == 1
          ? "0" + current.getDate()
          : current.getDate();
      var hour =
        current.getHours().toString().length == 1
          ? "0" + current.getHours()
          : current.getHours();
      var minute =
        current.getMinutes().toString().length == 1
          ? "0" + current.getMinutes()
          : current.getMinutes();
      var second =
        current.getSeconds().toString().length == 1
          ? "0" + current.getSeconds()
          : current.getSeconds();
      $(".time").html(`${hour}:${minute}:${second}`);
      $(".date").html(
        `${date} ${months[month]} ${year} ${days[current.getDay()]}`
      );
    }, 1000);

    // routes
    $(".dashboard").click(function (event) {
      location.href = "/dashboard";
    });
    $(".appointments").click(function () {
      location.href = "/appointments";
    });
    $(".cases").click(function () {
      location.href = "/cases";
    });
    $(".attorney").click(function () {
      location.href = "/attorney";
    });
    $(".features").click(function () {
      location.href = "/features";
    });
    $(".ftc").click(function () {
      location.href = "/ftc";
    });
    $(".aw").click(function () {
      location.href = "/aw";
    });
    $(".authentication").click(function () {
      location.href = "/authentication";
    });
    $(".miscellaneous").click(function () {
      location.href = "/miscellaneous";
    });

    const ctx1 = document.getElementById("myChart1");
    const ctx2 = document.getElementById("myChart2");
    const ctx3 = document.getElementById("myChart3");
    const ctx4 = document.getElementById("myChart4");
    const ctx5 = document.getElementById("myChart5");
    const ctx6 = document.getElementById("myChart6");
    const ctx7 = document.getElementById("myChart7");

    $(document).ready(function () {
      // Scroll to top button
      $(window).on("scroll", function () {
        scrollFunction();
      });
      var isButtonVisible = false;
      $(".scroll-top-icon").css("opacity", 0);
      function scrollFunction() {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          if (!isButtonVisible) {
            $(".scroll-top-icon").animate({ opacity: 1 }, 500);
            isButtonVisible = true;
          }
        } else {
          if (isButtonVisible) {
            $(".scroll-top-icon").animate({ opacity: 0 }, 500);
            isButtonVisible = false;
          }
        }
      }

      var cases = {
        url: `http://localhost:${port}/api/cases`,
        method: "GET",
      };
      $.ajax(cases).done(function (response) {
        var date_current = Date.now(),
          month_current =
            new Date(date_current).getMonth("en-IN", {
              timeZone: config.timezone,
            }) + 1,
          c3_won = 0,
          c3_lost = 0,
          c4 = [];
        for (var i = 0; i < 12; i++) {
          var c4_insert = {
            x: months[month_current],
            y: 0,
          };
          c4.push(c4_insert);
          month_current++;
          if (month_current > 11) month_current = 0;
        }
        response.forEach((element) => {
          c3_won = element.status == "win" ? c3_won + 1 : c3_won;
          c3_lost = element.status == "lost" ? c3_lost + 1 : c3_lost;
          var date = new Date(element.createDate).getMonth("en-IN", {
            timeZone: config.timezone,
          });
          for (var i = 0; i < c4.length; i++) {
            if (c4[i].x == months[date]) {
              c4[i].y =
                element.revenue == undefined || null
                  ? c4[i].y
                  : c4[i].y + element.revenue;
            }
          }
        });
        new Chart(ctx1, {
          type: "line",
          data: {
            datasets: [
              {
                label: "ONGOING",
                data: [
                  {
                    x: 10,
                    y: 20,
                  },
                  {
                    x: 15,
                    y: 4,
                  },
                  {
                    x: 20,
                    y: 10,
                  },
                  {
                    x: 25,
                    y: 5,
                  },
                  {
                    x: 30,
                    y: 15,
                  },
                  {
                    x: 35,
                    y: 10,
                  },
                  {
                    x: 40,
                    y: 20,
                  },
                  {
                    x: 45,
                    y: 5,
                  },
                  {
                    x: 50,
                    y: 15,
                  },
                  {
                    x: 55,
                    y: 10,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: primary,
                backgroundColor: primary,
              },
              {
                label: "SETTLED",
                data: [
                  {
                    x: 10,
                    y: 10,
                  },
                  {
                    x: 15,
                    y: 5,
                  },
                  {
                    x: 20,
                    y: 15,
                  },
                  {
                    x: 25,
                    y: 10,
                  },
                  {
                    x: 30,
                    y: 20,
                  },
                  {
                    x: 35,
                    y: 5,
                  },
                  {
                    x: 40,
                    y: 15,
                  },
                  {
                    x: 45,
                    y: 10,
                  },
                  {
                    x: 50,
                    y: 20,
                  },
                  {
                    x: 55,
                    y: 5,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderDash: [5, 10],
                borderColor: secondary,
                backgroundColor: secondary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx2, {
          type: "line",
          data: {
            datasets: [
              {
                label: "SATTLED",
                data: [
                  {
                    x: 10,
                    y: 5,
                  },
                  {
                    x: 15,
                    y: 15,
                  },
                  {
                    x: 20,
                    y: 8,
                  },
                  {
                    x: 25,
                    y: 12,
                  },
                  {
                    x: 30,
                    y: 18,
                  },
                  {
                    x: 35,
                    y: 7,
                  },
                  {
                    x: 40,
                    y: 14,
                  },
                  {
                    x: 45,
                    y: 9,
                  },
                  {
                    x: 50,
                    y: 22,
                  },
                  {
                    x: 55,
                    y: 3,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: primary,
                backgroundColor: primary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx3, {
          type: "doughnut",
          data: {
            labels: ["WON", "LOST"],
            datasets: [
              {
                label: "VOTES",
                data: [c3_won, c3_lost],
                backgroundColor: [primary, secondary],
                hoverOffset: 4,
                borderColor: "rgba(0, 0, 0, 0)",
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx4, {
          type: "bar",
          data: {
            labels: [
              "REAL ESTATE",
              "M&A",
              "CORPORATE",
              "EMPLOYMENT",
              "ENVIROMENTAL",
              "LITIGATION",
              "IP",
            ],
            datasets: [
              {
                label: "WON",
                data: [50, 70, 60, 80, 60, 70, 80],
                backgroundColor: primary,
              },
              {
                label: "LOST",
                data: [15, 25, 30, 20, 35, 40, 30],
                backgroundColor: secondary,
              },
              {
                label: "DECLINED",
                data: [10, 30, 45, 25, 35, 30, 30],
                backgroundColor: tertiary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            indexAxis: "y",
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                stacked: true,
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                position: "left",
                stacked: true,
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx5, {
          type: "line",
          data: {
            datasets: [
              {
                label: "SERIES",
                data: [
                  {
                    x: 0,
                    y: 0,
                  },
                  {
                    x: 3,
                    y: 200,
                  },
                  {
                    x: 6,
                    y: 300,
                  },
                  {
                    x: 9,
                    y: 150,
                  },
                  {
                    x: 12,
                    y: 350,
                  },
                  {
                    x: 15,
                    y: 100,
                  },
                  {
                    x: 18,
                    y: 250,
                  },
                  {
                    x: 21,
                    y: 200,
                  },
                  {
                    x: 24,
                    y: 400,
                  },
                  {
                    x: 27,
                    y: 50,
                  },
                ],
                borderWidth: 2,
                tension: 0.3,
                borderColor: primary,
                backgroundColor: primary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            scales: {
              x: {
                type: "linear",
                position: "bottom",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx6, {
          type: "line",
          data: {
            datasets: [
              {
                label: "REVENUE",
                data: c4,
                borderWidth: 2,
                tension: 0.3,
                borderColor: primary,
                backgroundColor: primary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            scales: {
              x: {
                position: "bottom",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                type: "linear",
                position: "left",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
        new Chart(ctx7, {
          type: "bar",
          data: {
            labels: [
              "CAMPAIGN",
              "EVENT",
              "REFERRAL",
              "SEMINAR",
              "SPONSORSHIP",
              "TICKETS",
            ],
            datasets: [
              {
                label: "WON",
                data: [30, 20, 25, 10, 15, 5, 20],
                backgroundColor: primary,
              },
              {
                label: "LOST",
                data: [5, 10, 15, 5, 20, 25, 15],
                backgroundColor: secondary,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: canvas,
                titleAlign: "center",
                cornerRadius: 10,
                usePointStyle: true,
                intersect: false,
                titleColor: sub_canvas,
                bodyColor: primary,
                borderColor: sub_canvas,
                borderWidth: 2,
                bodyFont: {
                  weight: 600,
                },
              },
              legend: {
                labels: {
                  color: primary,
                },
              },
            },
            scales: {
              x: {
                position: "bottom",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
              y: {
                position: "left",
                border: {
                  width: 2,
                  color: primary,
                },
                grid: {
                  color: tertiary,
                  tickColor: tertiary,
                },
                ticks: {
                  color: primary,
                },
              },
            },
            maintainAspectRatio: false,
          },
        });
      });
    });
  });
