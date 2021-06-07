$(document).ready(function(){
    function changeDateFormat(inputDate){  // expects Y-m-d
        var splitDate = inputDate.split('-');
        if(splitDate.count == 0){
            return null;
        }
    
        var year = splitDate[0];
        var month = splitDate[1];
        var day = splitDate[2]; 
    
        return day + '-' + month + '-' + year;
    }

    let codeNo,rqdDate;

    /************Get vaccination by pin code*****************/

    $('#avail_By_Pin').click(function(){
        codeNo = $('#pin_no').val();
        rqdDate = $('#pin_date').val();
        rqdDate = changeDateFormat(rqdDate);

        // Create an ajax request
        $.ajax({
            url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode="+codeNo+"&date="+rqdDate,
            success:function(data){
                console.log(data);
                let sample = "";

                let centerArr = data.sessions;
                console.log(centerArr);

                if(centerArr.length !== 0){
                for(let i = 0;i<centerArr.length;i++){
                    sample = sample + `
                              <tr >
                                 <td>${centerArr[i].name}</td>
                                 <td>${centerArr[i].address}</td>
                                 <td>${centerArr[i].vaccine}</td>
                                 <td>${centerArr[i].min_age_limit}</td>
                                 <td style="font-size:0.9em">
                                 <ol>
                                 <li>${centerArr[i].slots[0]}</li>
                                 <li>${centerArr[i].slots[1]}</li>
                                 <li>${centerArr[i].slots[2]}</li>
                                 <li>${centerArr[i].slots[3]}</li>
                                 </ol>
                                 </td>
                              </tr>
                              `;   
                }

                $('#current_status').html(` <h4>
                                            <span class="text-danger font-weight-bold">${centerArr.length}</span>
                                            Vaccination centers available at 
                                            <span class="text-danger"> ${centerArr[0].address}</span>
                                            </h4>
                                            <h5> from <span class="text-danger font-weight-bold"> ${centerArr[0].from} -  ${centerArr[0].to}</span></h5>`);

                $('#status_table').html(`     <div class="table-responsive">
                                              <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Center Name</th>
                                                    <th>Address</th>
                                                    <th>Vaccine</th>
                                                    <th>Min Age</th>
                                                    <th>Available Slots</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample}
                                               </tbody>
                                            </table>
                                            </div>
                `);


                }else{
                    console.log("data not available");
                    $('#current_status').html(`<h2 class="text-center">😕🙁😕</h2>
                    <h4>Sorry but we do not have data available for the location or the date you entered.</h4>`);
                    $('#status_table').html("");
                }
            },
            error: function(err){
                alert("Some Error Occured");
            }
        })
    })


    /************Get vaccination by dist code*****************/

    $('#avail_by_district').click(function(){
        codeNo = $('#distId').val();
        rqdDate = $('#distDate').val();
        rqdDate = changeDateFormat(rqdDate);

        // Create an ajax request
        $.ajax({
            url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id="+codeNo+"&date="+rqdDate,
            success:function(data){
                console.log(data);
                let sample = "";

                let centerArr = data.sessions;
                console.log(centerArr);
                
                if(centerArr.length !== 0){
                    
                let district_name = centerArr[0].district_name;

                for(let i = 0;i<centerArr.length;i++){
                    sample = sample + `
                              <tr>
                                 <td>${centerArr[i].name}</td>
                                 <td>${centerArr[i].address}</td>
                                 <td>${centerArr[i].vaccine}</td>
                                 <td>${centerArr[i].min_age_limit}</td>
                                 <td style="font-size:0.9em">
                                 <ol>
                                 <li>${centerArr[i].slots[0]}</li>
                                 <li>${centerArr[i].slots[1]}</li>
                                 <li>${centerArr[i].slots[2]}</li>
                                 <li>${centerArr[i].slots[3]}</li>
                                 </ol>
                                 </td>
                              </tr>
                              `;
                }

                $('#dist_status').html(` <h4>
                                            <span class="text-danger font-weight-bold">${centerArr.length}</span>
                                            Vaccination centers available at 
                                              <span class="text-danger"> ${district_name}</span>
                                            </h4>
                                            <h5> from <span class="text-danger font-weight-bold"> ${centerArr[0].from} -  ${centerArr[0].to}</span></h5>`);

                $('#dist_table').html(`   <div class="table-responsive">
                                           <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Center Name</th>
                                                    <th>Address</th>
                                                    <th>Vaccine</th>
                                                    <th>Min Age</th>
                                                    <th>Available Slots</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample}
                                               </tbody>
                                            </table>
                                            </div>
                `);
                }else{
                    console.log("data not available");
                    $('#dist_status').html(`<h2 class="text-center">😕☹😕</h2>
                    <h4>Sorry but we do not have data available for the location or the date you entered.</h4>`);
                    $('#dist_table').html("");
                }
            },
            error: function(err){
                alert("Some Error Occured");
            }
        })
    })



    /************Get vaccination by Pincode code for 7 days*****************/
    
    $('#avail_by_pin7').click(function(){
        codeNo = $('#pin7Id').val();
        rqdDate = $('#pin7Date').val();
        rqdDate = changeDateFormat(rqdDate);

        // Create an ajax request
        $.ajax({
            url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode="+codeNo+"&date="+rqdDate,
            success:function(data){
                console.log(data);
                let sample = "";

                let centerArr = data.centers;
                console.log(centerArr);
            
                if(centerArr.length !== 0){
                    
                let address = centerArr[0].address;

                for(let i = 0;i<centerArr.length;i++){
                    sample = sample + `
                              <tr>
                                 <td>${centerArr[i].name}</td>
                                 <td>${centerArr[i].sessions[0].available_capacity}</td>
                                 <td>${centerArr[i].sessions[0].vaccine}</td>
                                 <td>${centerArr[i].sessions[0].min_age_limit}</td>
                                 <td style="font-size:0.9em">
                                 <ol>
                                 <li>${centerArr[i].sessions[0].slots[0]}</li>
                                 <li>${centerArr[i].sessions[0].slots[1]}</li>
                                 <li>${centerArr[i].sessions[0].slots[2]}</li>
                                 <li>${centerArr[i].sessions[0].slots[3]}</li>
                                 </ol>
                                 </td>
                              </tr>
                              `;
                }

                $('#pin7_status').html(` <h4>
                                            <span class="text-danger font-weight-bold">${centerArr.length}</span>
                                            Vaccination center available at 
                                              <span class="text-danger"> ${address}</span>
                                            </h4>
                                            <h5> from <span class="text-danger font-weight-bold"> ${centerArr[0].from} -  ${centerArr[0].to}</span></h5>
                                            `);

                $('#pin7_table').html(`   <div class="table-responsive">
                                               <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Center Name</th>
                                                    <th>Available Quantity</th>
                                                    <th>Vaccine</th>
                                                    <th>Min Age</th>
                                                    <th>Available Slots</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample}
                                               </tbody>
                                            </table>
                                            </div>
                `);
                }else{
                    console.log("data not available");
                    $('#pin7_status').html(`<h2 class="text-center">😕☹😕</h2>
                    <h4>Sorry but we do not have data available for the location or the date you entered.</h4>`);
                    $('#dist_table').html("");
                }
            },
            error: function(err){
                alert("Some Error Occured");
            }
        })
    })

    
    
    /************Get vaccination by district id for 7 days*****************/
    $('#avail_by_dist7').click(function(){
        codeNo = $('#dist7Id').val();
        rqdDate = $('#dist7Date').val();
        rqdDate = changeDateFormat(rqdDate);

        // Create an ajax request
        $.ajax({
            url:"https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id="+codeNo+"&date="+rqdDate,
            success:function(data){
                console.log(data);
                let sample = "";

                let centerArr = data.centers;
                console.log(centerArr);
            
                if(centerArr.length !== 0){
                    
                let district = centerArr[0].district_name;

                for(let i = 0;i<centerArr.length;i++){
                    sample = sample + `
                              <tr >
                                 <td>${centerArr[i].name}</td>
                                 <td>${centerArr[i].sessions[0].available_capacity}</td>
                                 <td>${centerArr[i].sessions[0].vaccine}</td>
                                 <td>${centerArr[i].sessions[0].min_age_limit}</td>
                                 <td style="font-size:0.8em">
                                 <ol>
                                 <li>${centerArr[i].sessions[0].slots[0]}</li>
                                 <li>${centerArr[i].sessions[0].slots[1]}</li>
                                 <li>${centerArr[i].sessions[0].slots[2]}</li>
                                 <li>${centerArr[i].sessions[0].slots[3]}</li>
                                 </ol>
                                 </td>
                              </tr>
                              `;
                }

                $('#dist7_status').html(` <h4>
                                            <span class="text-danger font-weight-bold">${centerArr.length}</span>
                                            Vaccination center available at 
                                              <span class="text-danger"> ${district}</span>
                                            </h4>
                                            <h5> from <span class="text-danger font-weight-bold"> ${centerArr[0].from} -  ${centerArr[0].to}</span></h5>
                                            `);

                $('#dist7_table').html(`   <div class="table-responsive">
                                            <table class="table table-striped" style="width:100%;">
                                               <thead>
                                                  <tr>
                                                    <th>Center Name</th>
                                                    <th>Available Quantity</th>
                                                    <th>Vaccine</th>
                                                    <th>Min Age</th>
                                                    <th>Available Slots</th>
                                                  </tr>
                                               </thead>
                                               <tbody>
                                                ${sample}
                                               </tbody>
                                            </table>
                                            </div>
                `);
                }else{
                    console.log("data not available");
                    $('#dist7_status').html(`<h2 class="text-center">😕☹😕</h2>
                    <h4>Sorry but we do not have data available for the location or the date you entered.</h4>`);
                    $('#dist_table').html("");
                }
            },
            error: function(err){
                alert("Some Error Occured");
            }
        })
    })
    

    $(".modal").on("hidden.bs.modal", function(){
        $(".code").val("");
        $(".rqdDate").val("");
        $(".current").html("");
        $('.status').html("");
    });

}) ;





var preloader = document.getElementById('loading');
     function loader(){
         preloader.style.display = 'none';
     }
