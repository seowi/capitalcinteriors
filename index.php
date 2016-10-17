<?php

$host= "127.0.0.1";
$dbuser ="root";
$dbpass = "";
$dbname = "ocassioh_capitalcinteriors";
$db = new mysqli($host, $dbuser, $dbpass, $dbname) or die(mysql_error());

function getPrimaryImage($project){
    global $db;
    $result = $db->query("SELECT filename FROM projects_images WHERE `primary`=1 AND project = '$project';");
    $value = mysqli_fetch_row($result)[0];
    return $value;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>capitalcinteriors.com</title>

    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">


    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- Theme CSS -->
    <link href="css/agency.css" rel="stylesheet">
    <link href="css/production.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-top" class="index">

    <!-- Navigation -->
    <nav id="mainNav" class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span> Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand page-scroll" href="#page-top">
                    Capital C Interiors
                </a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right navbar-links">
                    <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#about">About</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#press">Press</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#projects">Projects</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#instagram"><i class="fa fa-instagram"></i></a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container-fluid -->
    </nav>

    <!-- Header -->
    <?php 
    $featured = array();
    $result = $db->query("SELECT * FROM featured ORDER BY `order` ASC");
    while($image = mysqli_fetch_assoc($result)){
        $featured[] = $image['filename'];
    }
    ?>
    <header data-background="0" data-background-images="<?=implode(",", $featured)?>" style="background-image: url('img/projects/<?=$featured[0]?>-p.jpg');">
        <div class="wrapper">
            <div class="container">
                <div class="intro-text">
                    <!-- <img class="intro-logo" src="img/logo_home_shadow.png" alt="" style="width: 60%;"> -->
                    &nbsp;
                    <a id="headerButton" href="#about" class="page-scroll btn btn-xl" style="visibility: hidden;">How we do it &nbsp; <i class="icon fa fa-arrow-circle-down"></i></a>
                </div>
            </div>
            <div class="name-right">Juan Carretero, founder</div>
        </div>
    </header>

    <section id="about">
        <div class="container">
            <div class="row">
                <div class="col-md-7" style="text-align: justify;">
                    <h2 class="section-heading" style="text-align: right;">
                        Personal design.<br/>Professional Service.
                    </h2>
                    <p>Our principal, Juan Carretero has been in business in the USA for over 10 years holding credentials in Architecture, Interior Design and Real Estate Project Management.</p>
                    <p>We have worked in different countries and cultures; these experiences have given us a deep appreciation for local craftsmanship and tradition.</p>
                    <p>As an award winning professional firm, we have been published in many different publications throughout the world. “Tailored, collected, inviting, timeless, exciting, fresh, comfortable, beautiful and inspiring” are only some of the ways in our job has been reviewed.</p>
                    <p>Please contact us. We welcome the opportunity to work together with you to create a very special place of your own.</p>
                </div>
                <div class="col-lg-5 map">
                    
                </div>
                <div class="col-md-12 about-juan">
                    <div class="img-wrapper">
                        <img src="img/header-juan-center.png" alt="">
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="press" class="portfolio bg-light-gray">
        <div class="wrapper">
            <div class="container">
                <?php 
                $press = array();
                $result = $db->query("SELECT * FROM press WHERE deleted=0 ORDER BY `order` ASC");
                while($article = mysqli_fetch_assoc($result)){
                    $press[] = $article;
                }
                foreach($press as $article):
                ?>
                <div class="portfolio-item">
                    <a href="#press-modal-<?=$article['id']?>" data-url="<?=$article['url']?>" data-title="<?=$article['title']?>" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-file-image-o fa-3x"></i>
                            </div>
                        </div>
                        <img src="img/projects/<?=$article['icon']?>.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="about" style="display: none;">
        <div class="container">
            <div class="row">
                <div class="col-md-7" style="text-align: justify;">
                    <h2 class="section-heading" style="text-align: right;">
                        Personal design.<br/>Professional Service.
                    </h2>
                    <p>Our principal, Juan Carretero has been in business in the USA for over 10 years holding credentials in Architecture, Interior Design and Real Estate Project Management.</p>
                    <p>We have worked in different countries and cultures; these experiences have given us a deep appreciation for local craftsmanship and tradition.</p>
                    <p>As an award winning professional firm, we have been published in many different publications throughout the world. “Tailored, collected, inviting, timeless, exciting, fresh, comfortable, beautiful and inspiring” are only some of the ways in our job has been reviewed.</p>
                    <p>Please contact us. We welcome the opportunity to work together with you to create a very special place of your own.</p>
                </div>
                <div class="col-lg-5 map">
                    
                </div>
                <div class="col-md-12 about-map">
                    <img src="img/map.png" alt="">
                </div>
            </div>
        </div>
    </section>

    <!-- Portfolio Grid Section -->
    <section id="projects" class="portfolio bg-light-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Projects</h2>
                    <h3 class="section-subheading text-muted">From design to construction, installation and furnishing, here is some of work we're most proud of...</h3>
                </div>
            </div>
            <div class="row">
                <?php 
                $projects = array();
                $result = $db->query("SELECT * FROM projects WHERE deleted=0 ORDER BY `order` ASC");
                while($project = mysqli_fetch_assoc($result)){
                    $projects[] = $project;
                }
                foreach($projects as $project):
                ?>
                <div class="col-md-4 col-sm-6 portfolio-item">
                    <a href="#project-modal-<?=$project['id']?>" data-url="<?=$project['url']?>" data-title="<?=$project['title']?>" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <img src="img/logo_white50.png" style="width: 60px;" alt="">
                                <div class="details-button">View Project</div>
                            </div>
                        </div>
                        <img src="img/projects/<?=getPrimaryImage($project['id'])?>-p.jpg" class="img-responsive" alt="">
                    </a>
                    <div class="portfolio-caption">
                        <h4><?=$project['title']?></h4>
                        <p class="text-muted">
                            <?php
                                if($project['subtitle']==""){
                                    echo "&nbsp;";
                                }else{
                                    echo $project['subtitle'];
                                }
                            ?>
                        </p>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <section id="quote">
        <div class="container">
            <div class="quote">
                "A space that meets your personal goals of comfort, aesthetics and personality is what we strive for. Our vision should be in harmony with your own style and sensibility."
            </div>
            <div class="author">
                Juan Carretero
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Contact Us</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <form name="sentMessage" id="contactForm" novalidate>
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <button type="submit" class="btn btn-xl btn-block">Send Message</button>
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-12 text-center">
                                <div class="details">
                                    <a href="mailto:info@capitalcinteriors.com">info@capitalcinteriors.com</a><br/>
                                    +1 212 228 0468
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="map-overlay" onClick="style.pointerEvents='none'"></div>
                    <div class="map">
                        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=false&key=AIzaSyBhyyaFxrsQUkZPKCCoYGUn0j3AMEU0cbs"></script><div style="overflow:hidden;height:400px;width:100%;"><div id="gmap_canvas" style="height:400px;width:100%;"><style>#gmap_canvas img{max-width:none!important;background:none!important}</style><a class="google-map-code" href="" id="get-map-data"></a></div></div><script type="text/javascript"> function init_map(){var myOptions = {zoom:14,center:new google.maps.LatLng(40.7287089,-73.98941509999997),mapTypeId: google.maps.MapTypeId.ROADMAP};map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);marker = new google.maps.Marker({map: map,position: new google.maps.LatLng(40.7287089, -73.98941509999997)});infowindow = new google.maps.InfoWindow({content:"<b>Capital C Interiors</b><br/>23 East 7th St<br/>Ground Floor<br/>New York, NY<br/>10003" });google.maps.event.addListener(marker, "click", function(){infowindow.open(map,marker);});infowindow.open(map,marker);}google.maps.event.addDomListener(window, 'load', init_map);</script>
                    </div>
                </div>
            </div>
        </div>
    </section>


    <!-- Contact Section -->
    <section id="instagram" class="portfolio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading"><i class="fa fa-instagram"></i>&nbsp;juanjocarr</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIyj-tKBCV6/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram1.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIqogR9hnm2/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram2.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIkLgGxB-Yh/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram3.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIiO68SBCjD/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram4.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIiOuQkhF1w/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram5.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIgJVi-hVif/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram6.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BIfbyhRhr9o/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram7.jpg" class="img-responsive" alt="">
                    </a>
                </div>
                <div class="col-md-3 col-sm-4 col-xs-6 portfolio-item">
                    <a href="https://www.instagram.com/p/BId-HrZBgRh/" target="_blank" class="portfolio-link" data-toggle="modal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-external-link fa-3x"></i>
                            </div>
                        </div>
                        <img src="instagram/instagram8.jpg" class="img-responsive" alt="">
                    </a>
                </div>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="row">
                <div class="col-md-4 text-left">
                    <span class="copyright">2016 &copy; Capital C Interiors</span>
                </div>
                <div class="col-md-4">
                    <ul class="list-inline social-buttons" style="display: none;">
                        <li><a href="#"><i class="fa fa-twitter"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-facebook"></i></a>
                        </li>
                        <li><a href="#"><i class="fa fa-linkedin"></i></a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-4 text-right footer-email">
                    <ul class="list-inline quicklinks">
                        <li><a href="mailto:info@capitalcinteriors.com">info@capitalcinteriors.com</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </footer>




    <!-- PROJECTS -->
    <?php foreach($projects as $project): ?>
    <div class="portfolio-modal project modal fade" id="project-modal-<?=$project['id']?>" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="close-modal" data-dismiss="modal">
                        <div class="lr">
                            <div class="rl">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 modal-image">
                            <div class="image-nav nav-left"></div>
                            <div class="image-nav nav-right"></div>
                            <div class="social-buttons">
                                <a href="projects/oliver1.jpg" target="_blank" class="image-zoom btn btn-primary">
                                    <i class="fa fa-search-plus fa-2x"></i>
                                </a>
                                <button type="button" class="btn btn-primary">
                                    <i class="fa fa-facebook fa-2x"></i>
                                </button>
                                <button type="button" class="btn btn-primary">
                                    <i class="fa fa-twitter fa-2x"></i>
                                </button>
                            </div>
                            <div class="images">
                                <?php 
                                $result = $db->query("SELECT * FROM projects_images WHERE project=".$project['id']." ORDER BY `order` ASC");
                                $i=1;
                                while($image = mysqli_fetch_assoc($result)):
                                ?>
                                    <div class="img-wrapper">
                                        <img class="img-responsive img-centered" src="img/projects/<?=$image['filename']?>.jpg" alt="">
                                        <a data-pin-do="buttonPin" data-pin-tall="true" data-pin-save="true" href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fcapitalcinteriors.com%2F<?=$project['url']?>&media=http%3A%2F%2Flocalhost%2Fimg%2Fprojects%2F<?=$image['filename']?>.jpg&description=<?=$project['title']?> - <?=$project['subtitle']?>"></a>
                                    </div>
                                <?php $i++; endwhile; ?>
                            </div>
                        </div>
                        <div class="col-lg-4 modal-desc">
                            <div>
                                <h2><?=$project['title']?></h2>
                                <p class="item-intro text-muted"><?=$project['subtitle']?></p>
                                <hr>
                                <div class="item-category">
                                    <i class="fa fa-building"></i>&nbsp; <?=$project['category']?>
                                </div>
                                <hr>
                                <p class="item-text">
                                    <?=$project['desc']?>
                                </p>
                                <div class="buttons">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-envelope"></i>&nbsp; Ask us about this project</button>
                                </div>
                                <hr>
                                    <ul class="tags">
                                        <?php
                                            $tags = explode(",", trim($project['tags'],","));
                                            foreach ($tags as $tag) {
                                                echo '<li><a href="#" class="tag">'.$tag.'</a></li>';
                                            }
                                        ?>
                                    </ul>
                                <hr>
                                <div class="item-subheading">
                                    <i class="fa fa-paint-brush"></i>&nbsp; Color palette
                                </div>
                                    <div class="colors">
                                        <span style="background-color: #fece00;"></span>
                                        <span style="background-color: #88679e;"></span>
                                        <span style="background-color: #0762a9;"></span>
                                        <span style="background-color: #b1c607;"></span>
                                        <span style="background-color: #2a3b45;"></span>
                                        <span style="background-color: #a3adaf;"></span>
                                    </div>
                                <hr>
                                <div class="item-subheading">
                                    <i class="fa fa-bars"></i>&nbsp; More projects like this one
                                </div>
                                <div class="row narrow">
                                    <div class="col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                        <img src="projects/chelseamodern.jpg" class="img-responsive" alt="">
                                    </div>
                                    <div class="col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                        <img src="projects/rutherford.jpg" class="img-responsive" alt="">
                                    </div>
                                    <div class="col-lg-4 col-md-3 col-sm-3 col-xs-3">
                                        <img src="projects/piedaterrelili.jpg" class="img-responsive" alt="">
                                    </div>
                                </div>
                                <br>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php endforeach; ?>

    <!-- Press Modal -->
    <?php foreach($press as $article): ?>
    <div class="portfolio-modal press modal fade" id="press-modal-<?=$article['id']?>" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="container">
                    <div class="close-modal" data-dismiss="modal">
                        <div class="lr">
                            <div class="rl">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12 modal-image">
                            <div class="image-nav nav-left"></div>
                            <div class="image-nav nav-right"></div>
                            <div class="social-buttons">
                                <a href="projects/oliver1.jpg" target="_blank" class="image-zoom btn btn-primary">
                                    <i class="fa fa-search-plus fa-2x"></i>
                                </a>
                                <button type="button" class="btn btn-primary">
                                    <i class="fa fa-facebook fa-2x"></i>
                                </button>
                                <button type="button" class="btn btn-primary">
                                    <i class="fa fa-twitter fa-2x"></i>
                                </button>
                            </div>
                            <div class="images">
                                <?php 
                                $result = $db->query("SELECT * FROM press_images WHERE press=".$article['id']." ORDER BY `order` ASC");
                                $i=1;
                                while($image = mysqli_fetch_assoc($result)):
                                ?>
                                    <div class="img-wrapper">
                                        <img class="img-responsive img-centered" src="img/projects/<?=$image['filename']?>.jpg" alt="">
                                    </div>
                                <?php $i++; endwhile; ?>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <?php endforeach; ?>


    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- Plugin JavaScript -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <!-- ScrollReveal -->
    <script src="https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js"></script>
    <!-- mousewheel -->
    <script type='text/javascript' src='plugins/mousewheel/jquery.mousewheel.min.js'></script>
    <!-- scrollup -->
    <script type='text/javascript' src='plugins/scrollup/src/jquery.scrollUp.js'></script>
    <!-- Pinterest -->
    <script type="text/javascript" async src="//assets.pinterest.com/js/pinit.js"></script>

    <script src="js/build/production.min.js"></script>


</body>

</html>
