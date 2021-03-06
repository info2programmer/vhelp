/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // document.addEventListener("backbutton", onBackKeyDown, false);
        document.addEventListener("offline", checkConnection, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {

        // This For Block Screen Rotation
        screen.orientation.lock('portrait');

        $('#btnLogin').click(function () {
            if ($('#txtUsername').val() == "" || $('#txtPassword').val() == "") {
                $('#txtUsername').css('border-color', 'red');
                $('#txtPassword').css('border-color', 'red');
            }
            else if ($('#txtUsername').val() == "") {
                $('#txtUsername').css('border-color', 'red');
            }
            else if ($('#txtUsername').val() == "") {
                $('#txtPassword').css('border-color', 'red');
            }
            else{
                var user_name = $('#txtUsername').val();
                var password = $('#txtPassword').val();
                var datas = { 'user_name': user_name, 'password': password };
                $(".se-pre-con").show();
                $.ajax({
                    type: "post",
                    url: "http://bebongstore.com/vhelp/manage_api/login",
                    data: datas,
                    dataType: 'json',
                    beforeSend: function () {
                        $('#btnLogin').prop('disabled', true);
                    },
                    success: function (response) {
                        if (response.status == 1) {
                            var name = response.student_arr.first_name + ' ' + response.student_arr.last_name; 
                            localStorage.setItem('name', name);
                            localStorage.setItem('uname', response.student_arr.email);
                            localStorage.login = "true";
                            localStorage.email = response.student_arr.email;
                            localStorage.name = name;
                            window.location.href = "profile.html";
                        }
                        else {
                            $('#txtUsername').css('border-color', 'red');
                            $('#txtPassword').css('border-color', 'red');
                            $('#txtUsername').val('');
                            $('#txtPassword').val('');
                            $('#btnLogin').prop('disabled', false);
                            $('#login-err').show();
                            $('#login-err').text('Invalid email or password');
                        }
                    }
                });
            }
        });
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }

};

// This Function For Check Internet Connection
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';

    // alert('Connection type: ' + states[networkState]);
    navigator.notification.alert(
        'No Internet Connection.',
        alertDismissed,
        'Alert!',
        'OK'
    );
    // navigator.app.exitApp();
}


