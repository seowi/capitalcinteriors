<?php
function sanitize_output($buffer) {

    $search = array(
        '/\>[^\S ]+/s',  // strip whitespaces after tags, except space
        '/[^\S ]+\</s',  // strip whitespaces before tags, except space
        '/(\s)+/s'       // shorten multiple whitespace sequences
    );

    $replace = array(
        '>',
        '<',
        '\\1'
    );

    $buffer = preg_replace($search, $replace, $buffer);

    return $buffer;
}

ob_start("sanitize_output");
header( 'Cache-Control: max-age=604800' );

if(isset($_GET['message'])){
 
    $captcha = $_GET['g-recaptcha-response'];
    if(strlen($captcha)<1){
        echo "Please complete the 'reCAPTCHA' check so we know you're not a robot.";
        die;
    }
    $name = $_GET['name'];
    $email = $_GET['email'];
    $phone = $_GET['phone'];
    $message = $_GET['message'];
    if($name=="" || $email=="" || $phone=="" || $message==""){
        echo "Please complete all fields";
        die;
    }
    $headers = 'From: capitalcinteriors@jonty.us' . "\r\n" .
        'Reply-To: ' . $email . "\r\n" .
        'X-Mailer: PHP/' . phpversion();
    $message = wordwrap($message,70);
    $body = "Name: ".$name."\r\n\r\n";
    $body .= "Email: ".$email."\r\n\r\n";
    $body .= $message;
    
    $sent = mail("info@capitalcinteriors.com","New message from capitalcinteriors.com",$body,$headers);
    if(!$sent) echo "Sorry, there was a problem sending your message";
    mail("jonty.usborne@gmail.com","New message from capitalcinteriors.com",$body,$headers);
    // echo "<pre>";
    // print_r($_GET);
    // echo "</pre>";
    die;
}


$host= "127.0.0.1";
$dbuser ="ocassioh_cci";
// $dbpass = "Record";
include("../../capitalcinteriors_password.php");
$dbname = "ocassioh_capitalcinteriors";

// $dbuser = "root";
// $dbpass = "";

$db = new mysqli($host, $dbuser, $dbpass, $dbname) or die(mysql_error());

function getPrimaryImage($project){
    global $db;
    $result = $db->query("SELECT filename FROM projects_images WHERE `primary`=1 AND project = '$project';");
    $value = mysqli_fetch_row($result)[0];
    return $value;
}

$rootURI = rtrim($_SERVER['REQUEST_URI'],'/')."/";
$rootURI = "/capitalcinteriors/";
$HOST = "http://".$_SERVER['HTTP_HOST'];

$rootURI = "/";


// echo "<pre>";
// print_r($_SERVER);
// echo "</pre>";

if(isset($_GET['url'])) {
    $url = $_GET['url'];
    $result = $db->query("SELECT id FROM projects WHERE url='$url';");
    if($result->num_rows){
        $projectOnLoad = mysqli_fetch_row($result)[0];
    }else{
        $result = $db->query("SELECT id FROM press WHERE url='$url';");
        if($result->num_rows){
            $pressOnLoad = mysqli_fetch_row($result)[0];
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A professional design, architecture and real estate project management firm with a personal touch. Based in NYC and lead by principal Juan Carretero, we have a decade of experience working in many countries and cultures, and have built a deep appreciation for local craftsmanship and tradition.">
    <meta name="author" content="Juan Carretero">
    <link rel="shortcut icon" href="img/favicon.ico" />
    <meta http-equiv="cache-control" content="public">
    <title>Juan Carretero - New York Interior Design | NYC Interior Design | Affordable Interior Design</title>
    <meta property="og:locale" content="en_US" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Juan Carretero - New York Interior Design | Affordable Interior Design" />
	<meta property="og:description" content="A professional design, architecture and real estate project management firm with a personal touch. Based in NYC and lead by principal Juan Carretero, we have a decade of experience working in many countries and cultures, and have built a deep appreciation for local craftsmanship and tradition." />
	<meta property="og:url" content="http://capitalcinteriors.com" />
	<meta property="og:site_name" content="Juan Carretero - New York Interior Design" />
	<meta property="og:image" content="http://capitalcinteriors.com/img/projects/od7gg3-p.jpg" />
	<meta property="og:image:width" content="810" />
	<meta property="og:image:height" content="486" />
    <meta name="twitter:title" content="Juan Carretero - New York Interior Design | Affordable Interior Design"/>
    <meta name="twitter:description" content="A professional design, architecture and real estate project management firm with a personal touch. Based in NYC and lead by principal Juan Carretero, we have a decade of experience working in many countries and cultures, and have built a deep appreciation for local craftsmanship and tradition."/>	
	<meta name="twitter:url" content="http://capitalcinteriors.com/"/>
    <meta name="twitter:image" content="http://capitalcinteriors.com/img/projects/od7gg3-p.jpg">
	<meta name="twitter:card" content="summary"/>
    <!-- Bootstrap Core CSS -->
    <style>
        <?php include("vendor/bootstrap/css/bootstrap.min.css"); ?>
    </style>

    <!-- Theme CSS -->
    <style>
        <?php include("css/agency.css"); ?>
        <?php include("css/production.css"); ?>
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->


</head>

<body id="page-top" class="index" data-root="<?=$rootURI?>">
<?php include_once("analyticstracking.php") ?>

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
                        <a class="page-scroll" href="#process">Process</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#contact">Contact</a>
                    </li>
                    <li>
                        <a class="page-scroll" href="#reviews">Reviews</a>
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
                    <a id="headerButton" href="#about" class="page-scroll btn btn-xl" style="visibility: hidden;">See what we do &nbsp; <i class="icon fa fa-arrow-circle-down"></i></a>
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
            <div class="press_nav_left"></div>
            <div class="press_nav_right"></div>
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
                    <a href="#press-modal-<?=$article['id']?>" data-url="<?=$rootURI.$article['url']?>" data-title="<?=$article['title']?>" class="portfolio-link" data-toggle="modal" <?php if(isset($pressOnLoad) && $pressOnLoad==$article['id']) echo 'data-onLoad';?>>
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
                $inProgress = array();
                $result = $db->query("SELECT * FROM projects WHERE deleted=0 ORDER BY `order` ASC");
                while($project = mysqli_fetch_assoc($result)){
                    $projects[] = $project;
                    if($project['category']=="In-Progress") $inProgress[] = $project;
                }
                $i=1;
                foreach($projects as $project):
                ?>
                <div class="col-md-4 col-sm-6 portfolio-item" <?php if($project['category']=="In-Progress") echo "style='display:none'" ?>>
                    <a href="#<?=$project['id']?>-<?=$project['url']?>" data-url="<?=$rootURI.$project['url']?>" data-title="<?=$project['title']?>" class="portfolio-link" data-toggle="modal" <?php if(isset($projectOnLoad) && $projectOnLoad==$project['id']) echo 'data-onLoad';?>>
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
                <?php if($i==3): ?>
                    <div id="in-progress" class="col-md-8 col-sm-6 portfolio-item">
                        <a href="#<?=$inProgress[0]['id']?>-<?=$inProgress[0]['url']?>" data-url="<?=$rootURI.$inProgress[0]['url']?>" data-title="<?=$inProgress[0]['title']?>" class="portfolio-link" data-toggle="modal" <?php if(isset($projectOnLoad) && $projectOnLoad==$inProgress[0]['id']) echo 'data-onLoad';?>>
                            <div class="portfolio-hover">
                                <div class="portfolio-hover-content">
                                    <img src="img/logo_white50.png" style="width: 60px;" alt="">
                                    <div class="details-button">View Projects</div>
                                </div>
                            </div>
                            <img id="in-progress-img" src="img/projects/<?=getPrimaryImage($inProgress[0]['id'])?>-p.jpg" class="img-responsive" alt="">
                        </a>
                        <div class="portfolio-caption">
                            <div class="row">
                                <div class="col-md-1 col-sm-3 col-xs-3">
                                    <i class="fa fa-wrench fa-3x" style="margin-top: -3px;"></i>
                                </div>
                                <div class="col-md-11 col-sm-9 col-xs-9" style="text-align: left;">
                                    <h4>In-Progress Projects</h4>
                                    <p class="text-muted">
                                        Designs, sketches and mock-ups from some of our ongoing work.
                                    </p>
                                    <p class="text-muted sm">
                                        Designs &amp; sketches
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endif; $i++; endforeach; ?>
            </div>
        </div>
    </section>

    <section id="process">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Our Process</h2>
                    <h3 class="section-subheading text-center text-muted" style="margin-bottom: 20px;">
                        <div style="margin: auto; max-width: 75%;">
                            We have been around the block a few times so we are well equipped to foresee and control  the issues that inevitably arise through all phases of design and construction. Our aim is to make this process worry-free for you, under budget and as fast as possible. Planning is key.
                        </div>
                    </h3>
                </div>
            </div>
            <div style="padding: 0 50px;">
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-comments-o" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>FIRST THINGS FIRST...</b><br/>
                        We begin with the basics. Communication is key.  We must identify your needs, even those you didn’t know you have. Everything you love and more importantly maybe,  everything you don’t. What is your life like and how can we make it better?. We need to learn <b>what is really meaningful to you</b>, what makes you happy and what is the image you want to project, so we can fully understand your perfect world.
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-paint-brush" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>CONCEPT PROPOSAL...</b><br/>
                        We present our initial schematic designs to <b>help you visualize your new interiors</b>. We show you our concept boards with proposed furnishings, colors, millwork, cabinetry, etc. 
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-clipboard" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>DOCS...</b><br/>
                        We proceed with the construction documents to inform craftspeople, trades people and contractors of how exactly to build out your new rooms. Remember our background is in architecture so <b>we understand you and the building process</b>.
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-check-square-o" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>APPROVALS...</b><br/>
                        We finalize all the drawings, all the layouts, all the custom finishes and all the details and we show you the final proposal <b>for your approval</b>. 
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-flip-horizontal fa-truck " aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>PROCUREMENT...</b><br/>
                        We proceed to purchase, order, ship, receive, inspect and store all your furnishings until Installation Day. 
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-wrench" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>CONSTRUCTION &amp; PROJECT MANAGEMENT...</b><br/>
                        But this is not only decorating, at the same time <b>we could also manage your project on site</b> – think electrical, plumbing, lighting, AV, landscaping, cabinetry, millwork, wallpapers, curtains, rugs, hardware, painters and every other imaginable trade. From the ground up we constantly update your “punch list,” ensuring that everything is being done to the higher standard. In the meantime we keep you in the loop - in as much as you like - by sending you pictures of the process. 

                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-home" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>INSTALLATION...</b><br/>
                        Nearly there! On Installation day, we show with all your beautiful furnishings and we make sure everything is perfectly placed where we have carefully planned to.  We are experts in scale, proportions, textures, comfort, durability, suitability, color coordination, art placement and decorating. 
                    </div>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-2 text-center">
                        <i class="fa fa-5x fa-key" aria-hidden="true"></i>
                    </div>
                    <div class="col-md-10 text-justify">
                        <b>THE BIG REVEAL...</b><br/>
                        Your new space is ready for you to enjoy and share with your family and friends and <b>it is our greatest wish that you build wonderful new memories with them in your beautiful new perfect world</b>. 
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="quote" class="bg-light-gray">
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
                    <form id="emailForm" novalidate method="get" action="<?=$rootURI?>">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="form-group">
                                    <input name="name" type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input name="email" type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <input name="phone" type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number.">
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="col-md-12">
                                <div class="form-group">
                                    <textarea name="message" class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                                    <p class="help-block text-danger"></p>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                            <div class="col-md-12 recaptcha" style="display: none; transform: scale(0.88); transform-origin: 0 0; margin-bottom: 10px;">
                                <div class="g-recaptcha" data-sitekey="6LdOMQsUAAAAAEOM4-E5BhE3ohtwOzo4BoOXza0C"></div>
                                <input id="captchaInput" type="hidden" name="captcha" value="0">
                            </div>
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

    <section id="reviews" class="bg-light-gray">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading">Customer Reviews</h2>
                </div>
            </div>
            <hr style="margin: 0 25% 20px">
            <div>
                <div class="quote">
                    "It's not just that Juan Carretero is clearly an outstanding talent, I can also vouch for his amazing efficiency and decency. If you want a fabulous job done in your home that will also be executed smoothly without unexpected headaches or drama, I would absolutely recommend Capital C. I could not have been more satisfied with the whole process or more thrilled with the outcome."
                    <div class="author">
                        David L.
                    </div>
                </div>
                <div class="quote" style="display: none;">
                    <hr>
                     "I've had great experiences working with Capital C Interiors on several occasions. Outstanding creativity, design drive and process, always looking after the client's specific needs."
                    <div class="author">
                        Fernando D.
                    </div>
                </div>
                <div class="quote" style="display: none;">
                    <hr>
                     "Did an outstanding job designing the renovation of two homes. Juan is a consummate professional. Highly recommended!"
                    <div class="author">
                        Chris C.
                    </div>
                </div>
                <div class="quote" style="display: none;">
                    <hr>
                     "I have worked with Juan three times. He is amazing! Great design sense. Wonderfully adventurous and skilled with colors. And finds economical solutions. He is also a delight to work with."
                    <div class="author">
                        Alex O.
                    </div>
                </div>
                <div class="quote" style="display: none;">
                    <hr>
                     "I worked with Juan for a year and a half on a two-story new concept restaurant in a complex, 100-year old historic building, which led to many accessory projects for the accomplished, multi-national owners. His innovative approach to design and collaborative attitude enabled seamless interaction with multiple architects, owner representatives and demanding clientele. All budgets, deadlines and expectations were met or exceeded, and the end products brought a new and fresh sophistication to the downtown redevelopment. Many thanks. Would highly recommend."
                    <div class="author">
                        Mark B.
                    </div>
                </div>
            </div>
            <div style="margin: 0 25% -10px; font-size: 20px; text-align: center;">
                <hr>
                <a href="#">Read more...</a>
            </div>
        </div>
    </section>

    <!-- Instagram Section -->
    <section id="instagram" class="portfolio">
        <div class="container">
            <div class="row">
                <div class="col-lg-12 text-center">
                    <h2 class="section-heading"><i class="fa fa-instagram"></i>&nbsp;juan.j.carretero</h2>
                </div>
            </div>
            <div class="row ajax">
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

    <!-- MODALS -->
    <div id="modals-wrapper">
        <?php if(isset($_GET['url'])) include("modals.php"); ?>
    </div>

    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Kaushan+Script' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Droid+Serif:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>

    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- Plugin JavaScript -->
    <script src="plugins/jquery.easing.min.js"></script>
    <!-- ScrollReveal -->
    <script src="https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js"></script>
    <!-- mousewheel -->
    <script type='text/javascript' src='plugins/mousewheel/jquery.mousewheel.min.js'></script>
    <!-- scrollup -->
    <script type='text/javascript' src='plugins/scrollup/src/jquery.scrollUp.js'></script>
    <!-- Recaptcha -->
    <script src='https://www.google.com/recaptcha/api.js'></script>

    <script src="js/build/production.min.js"></script>


</body>

</html>
