

  <nav class="col-md-2 d-none d-md-block sidebar" style = "padding-top: 122px; background-color: #efeff5;">
  <div class="sidebar-sticky" >
    <ul class="nav flex-column"> 
      
       
    <li class="nav-item">
        <a class="nav-link" href="#" >
          <!-- <span data-feather="file"></span> -->
          <div align="center"><?php echo anchor("members/all-members","<i class='fas fa-users'> MEMBER</i>", array("class"=> "text-dark", "style"=>"color:black;font-family: 'PT Serif', serif; font-weight:bold;"));?> <span class="sr-only">(current)</span>
        </div>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link active" href="#">
          <!-- <span data-feather="home"></span> -->
          <div align="center">
          <a class="text-dark" style="color:black;font-family: 'PT Serif', serif; font-weight:bold;" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <i class="fas fa-piggy-bank"> SAVINGS</i>
          </a>
          </div>

          <div align = "right" class="collapse" id="collapseExample"><?php echo anchor("microfinance/saving_types","Saving Types", array("class"=> "text-dark", "style"=>"color:black;font-family: 'PT Serif', serif;"));?> <span class="sr-only">(current)</span>
          </div>

          <!-- <div align = "right" class="collapse" id="collapseExample"><?php //echo anchor(" ","Members Savings", array("class"=> "text-dark", ));?> <span class="sr-only">(current)</span>
          </div> -->

        </a>
      </li>
      <li class="nav-item">
      
        <a class="nav-link active" href="#">
          <!-- <span data-feather="file"></span> -->
          <div align="center">
          <a class="text-dark" style="color:black;font-family: 'PT Serif', serif; font-weight:bold;" data-toggle="collapse" href="#collapseExample1" role="button" aria-expanded="false" aria-controls="collapseExample">
          <i class="fas fa-hand-holding-usd"> LOANS</i>
          </a>
          </div>

          <div align="right" class="collapse" id="collapseExample1"><?php echo anchor("loan-types/all-loan-types","Loan Types", array("class"=> "text-dark", "style"=>"color:black;font-family: 'PT Serif', serif;"));?> <span class="sr-only">(current)</span>
          </div>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">
          <!-- <span data-feather="file"></span> -->
          <div align="right" class="collapse" id="collapseExample1"><?php echo anchor("loans/loans","Loan Management", array("class"=> "text-dark","style"=>"color:black;font-family: 'PT Serif', serif;"));?> <span class="sr-only">(current)</span>
          </div>
        </a>
      </li>
         
  </ul>
  </div>
</nav>

