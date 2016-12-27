<?php

if( !isset($projects) || !isset($press) ){
    
    $host= "127.0.0.1";
    $dbuser ="ocassioh_cci";
    // $dbpass = "Record";
    include("../../capitalcinteriors_password.php");
    $dbname = "ocassioh_capitalcinteriors";

    // $dbuser = "root";
    // $dbpass = "";

    $db = new mysqli($host, $dbuser, $dbpass, $dbname) or die(mysql_error());

    $projects = array();
    $result = $db->query("SELECT * FROM projects WHERE deleted=0 ORDER BY `order` ASC");
    while($project = mysqli_fetch_assoc($result)){
        $projects[] = $project;
    }  

    $press = array();
    $result = $db->query("SELECT * FROM press WHERE deleted=0 ORDER BY `order` ASC");
    while($article = mysqli_fetch_assoc($result)){
        $press[] = $article;
    }

}

?>

    <!-- PROJECTS -->
    <?php foreach($projects as $project): ?>
    <div class="portfolio-modal project modal fade" id="<?=$project['id']?>-<?=$project['url']?>" data-url="<?=$project['url']?>" data-title="<?=$project['title']?>" data-id="<?=$project['id']?>" data-category="<?=$project['category']?>" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    list($imgWidth, $imgHeight) = getimagesize("img/projects/".$image['filename'].".jpg");
                                ?>
                                    <div class="img-wrapper">
                                        <img data-width="<?=$imgWidth?>" data-height="<?=$imgHeight?>" class="project-image img-responsive img-centered" src="img/projects/<?=$image['filename']?>.jpg" alt="">
                                        <a href="http://pinterest.com/pin/create/button/?url=https%3A%2F%2Fcapitalcinteriors.com%2F<?=$project['url']?>&media=<?=urlencode($HOST.$rootURI."img/projects/".$image['filename'].".jpg")?>&description=<?=$project['title']?> - <?=$project['subtitle']?>" target="_blank" class="pin-it-button" count-layout="horizontal">
                                            <img border="0" src="img/pin.png" title="Pin It" />
                                        </a>
                                        <!-- <a data-pin-do="buttonPin" data-pin-tall="true" data-pin-save="true" href="https://www.pinterest.com/pin/create/button/?url=https%3A%2F%2Fcapitalcinteriors.com%2F<?=$project['url']?>&media=<?=urlencode($HOST)?>img%2Fprojects%2F<?=$image['filename']?>.jpg&description=<?=$project['title']?> - <?=$project['subtitle']?>"></a> -->
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
                                    <?php
                                        $category = $project['category'];
                                        if($category=="Apartment") $catIcon = "building";
                                        if($category=="Commercial") $catIcon = "bank";
                                        if($category=="Hotel") $catIcon = "bed";
                                        if($category=="House") $catIcon = "home";
                                        if($category=="Restaurant") $catIcon = "cutlery";
                                        if($category=="Retail") $catIcon = "shopping-bag";
                                        if($category=="In-Progress") $catIcon = "wrench";
                                    ?>
                                    <i class="fa fa-<?=$catIcon?>"></i>&nbsp; <?=$project['category']?>
                                </div>
                                <hr>
                                <p class="item-text">
                                    <?=$project['desc']?>
                                </p>
                                <div class="buttons">
                                    <button type="button" class="btn btn-primary" data-dismiss="modal"><i class="fa fa-envelope"></i>&nbsp; Ask us about this project</button>
                                </div>
                                <hr>
                                <?php if($tags!=''): ?>
                                    <ul class="tags">
                                        <?php
                                            $tags = explode(",", trim($project['tags'],","));
                                            foreach ($tags as $tag) {
                                                echo '<li><a href="#" class="tag">'.$tag.'</a></li>';
                                            }
                                        ?>
                                    </ul>
                                <hr>
                                <?php endif; ?>
                                <!--
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
                                -->
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
    <div class="portfolio-modal press modal fade" id="press-modal-<?=$article['id']?>" data-url="<?=$article['url']?>" tabindex="-1" role="dialog" aria-hidden="true">
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
                                    list($imgWidth, $imgHeight) = getimagesize("img/projects/".$image['filename'].".jpg");
                                ?>
                                    <div class="img-wrapper">
                                        <img data-width="<?=$imgWidth?>" data-height="<?=$imgHeight?>" class="project-image img-responsive img-centered" src="img/projects/<?=$image['filename']?>.jpg" alt="">
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