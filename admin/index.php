<?php

// username: juan
// password: wildings

$host= "127.0.0.1";
$dbuser ="ocassioh";
// $dbpass = "Record";
$dbpass = "REDACTED";
$dbname = "ocassioh_capitalcinteriors";

// $dbuser = "root";
// $dbpass = "";

$db = new mysqli($host, $dbuser, $dbpass, $dbname) or die(mysql_error());

function escapeArray($array){
    global $db;
    array_walk($array, function(&$string) use ($db) { 
        if ( (array) $string !== $string ) { 
            $string = $db->real_escape_string($string);
        } else { 
           $string = escapeArray($string); 
        } 
    });
    return $array;
}
function getPrimaryImage($project){
    global $db;
    $result = $db->query("SELECT filename FROM projects_images WHERE `primary`=1 AND project = '$project';");
    $value = mysqli_fetch_row($result)[0];
    return $value;
}


// echo "<pre>";
// print_r($_POST);
// echo "</pre>";

// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL);

    if(isset($_GET['checkURL'])){
        $URL = $_GET['checkURL'];
        $id = $_GET['id'];
        $table = $_GET['type'];
        if( file_exists("../$URL") || is_dir("../$URL") || count(glob("$URL.*"))>0 ){
            echo 1;         
        }else{
            // Check press table
                $query = "SELECT id FROM press WHERE URL='$URL'";
                if($table=="press") $query .= "AND id!=$id";
                $result = $db->query($query);
                $press = $result->num_rows;
            // Check projects table
                $query = "SELECT id FROM projects WHERE URL='$URL'";
                if($table=="projects") $query .= "AND id!=$id";
                $result = $db->query($query);
                $projects = $result->num_rows;
            // Sum
                echo $press + $projects;
        }
        die;
    }

    // Add featured image
    
    // Delete featured image
    if(isset($_GET['deleteFeatured'])){
        $query = "DELETE FROM featured WHERE filename='".$_GET['deleteFeatured']."'";
        $db->query($query);
        die;
    }

    if(isset($_GET['orderFeatured'])){
        $featured = explode(",", trim($_GET['orderFeatured'],","));
        $i = 1;
        foreach ($featured as $feature) {
            $query = "UPDATE featured SET `order`=$i WHERE filename='$feature';";
            echo $query;
            $db->query($query);
            $i++;
        }
        die;
    }

    if(isset($_GET['orderProjects'])){
        $projects = explode(",", trim($_GET['orderProjects'],","));
        $i = 1;
        foreach ($projects as $project) {
            $query = "UPDATE projects SET `order`=$i WHERE id=$project;";
            $db->query($query);
            $i++;
        }
        die;
    }

    if(isset($_FILES['image'])){
        // UPLOAD IMAGE
        $errors= array();
        $file_name = $_FILES['image']['name'];
        $file_size = $_FILES['image']['size'];
        $file_tmp = $_FILES['image']['tmp_name'];
        $file_ext = strtolower(end(explode('.',$file_name)));
        $file_base = base_convert(time(), 10, 36);
        $file_name = $file_base.".".$file_ext;
        $expensions= array("jpeg","jpg","png");
        if(in_array($file_ext,$expensions)=== false){
            $errors[]="Image file extension not allowed. Please choose a JPEG or PNG file.";
        }
        if($file_size > 2097152) {
            $errors[]='Image file size must not exceed 2 MB.';
        }
        if(empty($errors)==true) {
            // Make thumbnail
                $img = $file_tmp;
                $img_info = getimagesize($img);
                $width = $img_info[0];
                $height = $img_info[1];
                switch ($img_info[2]) {
                  case IMAGETYPE_GIF  : $src = imagecreatefromgif($img);  break;
                  case IMAGETYPE_JPEG : $src = imagecreatefromjpeg($img); break;
                  case IMAGETYPE_PNG  : $src = imagecreatefrompng($img);  break;
                  default : $src = "";
                }
                if(!isset($_POST['featured'])){
                    $thumb_width = 720;
                    $thumb_height = 432;
                }else{
                    $thumb_width = $width;
                    $thumb_height = $width*(432/720);
                }
                $original_aspect = $width / $height;
                $thumb_aspect = $thumb_width / $thumb_height;
                if ( $original_aspect >= $thumb_aspect ){
                    $new_height = $thumb_height;
                    $new_width = $width / ($height / $thumb_height);
                }else{
                    $new_width = $thumb_width;
                    $new_height = $height / ($width / $thumb_width);
                }
                $thumb = imagecreatetruecolor( $thumb_width, $thumb_height );
                imagecopyresampled($thumb,
                                    $src,
                                    0 - ($new_width - $thumb_width) * 0.5, 
                                    0 - ($new_height - $thumb_height) * 0.5, 
                                    0, 0,
                                    $new_width, $new_height,
                                    $width, $height);
                $image_name = $file_base."-p.jpg";
                imagejpeg($thumb, "../img/projects/$image_name");
                chmod("../img/projects/$image_name", 0777);
            // Upload original file
            if(!isset($_POST['featured'])){
                // move_uploaded_file($file_tmp,"../img/projects/".$file_name);
                move_uploaded_file($file_tmp,"../img/projects/".$file_base.".jpg");
            }
        }else{
            echo $errors[0];
        }
        if(isset($_POST['featured']) && $_POST['featured']==1){
            $result = $db->query("SELECT `order` FROM featured ORDER BY `order` DESC LIMIT 1;");
            $order = mysqli_fetch_row($result)[0];
            $order++;
            $query = "INSERT INTO featured (`filename`,`order`) VALUES ('$file_base',$order);";
            $db->query($query);
        }else{
            if(empty($errors)==true){
                echo $file_base;
            }
            die;
        }
    }

    if(isset($_POST['action']) && $_POST['action']=="edit"){
        // echo "<pre>";
        // print_r($_POST);
        // echo "</pre>";
        $project = escapeArray($_POST);

        if($project['id']==0){
            // Get largest order
            $result = $db->query("SELECT `order` FROM projects ORDER BY `order` DESC LIMIT 1;");
            $order = mysqli_fetch_row($result)[0];
            $order++;
            // Insert new project
            $query = "INSERT INTO projects (`order`) VALUES ($order);";
            $db->query($query);
            $project['id'] = $db->insert_id;
        }

        // Remove all images
        $query = "DELETE FROM projects_images WHERE project=".$project['id'];
        $db->query($query);
        // Add images
        $images = explode(",", trim($project['images'],","));
        $i = 1;
        foreach ($images as $image) {
            $query = "INSERT INTO projects_images (`project`,`filename`,`order`) VALUES (".$project['id'].",'$image',$i);";
            $db->query($query);
            $i++;
        }
        // Set primary image
        $query = "UPDATE projects_images SET `primary`=0 WHERE project=".$project['id'];
        $db->query($query);
        $query = "UPDATE projects_images SET `primary`=1 WHERE filename='".$project['image-primary']."' AND project=".$project['id'];
        $db->query($query);
        // Update details
        $query = "UPDATE projects SET ";
        $query .= "`title`='".$project['title']."', ";
        $query .= "`subtitle`='".$project['subtitle']."', ";
        $query .= "`category`='".$project['category']."', ";
        $query .= "`url`='".$project['url']."', ";
        $query .= "`tags`='".$project['tags']."', ";
        $query .= "`desc`='".$project['desc']."', ";
        $query .= "`deleted`='".$project['deleted']."' ";
        $query .= "WHERE id=".$project['id'].";";
        $db->query($query);

    }

    if(isset($_POST['action']) && $_POST['action']=="press"){
        // echo "<pre>";
        // print_r($_POST);
        // echo "</pre>";
        $article = escapeArray($_POST);

        if($article['id']==0){
            // Get largest order
            $result = $db->query("SELECT `order` FROM press ORDER BY `order` DESC LIMIT 1;");
            $order = mysqli_fetch_row($result)[0];
            $order++;
            // Insert new project
            $query = "INSERT INTO press (`order`) VALUES ($order);";
            $db->query($query);
            $article['id'] = $db->insert_id;
        }

        // Remove all images
        $query = "DELETE FROM press_images WHERE press=".$article['id'];
        $db->query($query);
        // Add images
        $images = explode(",", trim($article['images'],","));
        $i = 1;
        foreach ($images as $image) {
            $query = "INSERT INTO press_images (`press`,`filename`,`order`) VALUES (".$article['id'].",'$image',$i);";
            $db->query($query);
            $i++;
        }
        // Update details
        $query = "UPDATE press SET ";
        $query .= "`title`='".$article['title']."', ";
        $query .= "`url`='".$article['url']."', ";
        $query .= "`icon`='".$article['icon']."', ";
        $query .= "`deleted`='".$article['deleted']."' ";
        $query .= "WHERE id=".$article['id'].";";
        $db->query($query);

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

    <title>Capital C Interiors - Admin</title>


    <!-- Theme CSS -->

    <link rel="stylesheet" href="../font-awesome/css/font-awesome.min.css" type="text/css">
    <link rel="stylesheet" href="../css/creative.css" type="text/css">
    <link href="../css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../css/agency.css" rel="stylesheet"  type="text/css">
    <link rel="stylesheet" href="//cdn.jsdelivr.net/bootstrap.tagsinput/0.4.2/bootstrap-tagsinput.css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <link href="../css/production.css" rel="stylesheet"  type="text/css">
    <link href="../css/AdminLTE.min.css" type="text/css" rel="stylesheet">
    <link href="../css/admin.css" rel="stylesheet"  type="text/css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body id="page-admin">

    <section id="featured" class="content">
        <div class="box box-info portfolio">
            <div class="box-header" style="border-bottom: 1px solid #ccc;">
                <h2 class="box-title" style="zoom: 1.5;"><i class="fa fa-star-o"></i> &nbsp; Splash Images</h2>
            </div>
            <form action="" method="post" enctype="multipart/form-data" style="opacity: 0; height: 0;">
                <input type="file" name="image" />
                <input type="hidden" name="featured" value="1">
            </form>
            <div class="box-body" style="background: #eee; padding: 10px 25px;">
                <ul class="sortable featured row no-gutter">

                    <?php 
                    $result = $db->query("SELECT * FROM featured ORDER BY `order` ASC");
                    while($featured = mysqli_fetch_assoc($result)):
                    ?>
                        <li class="col-md-2 featured-image" data-id="<?=$featured['filename']?>">
                            <div class="image-hover">
                                <div class="image-hover-content">
                                    <div class="row no-gutter" style="margin: 0 30px;">
                                        <div class="col-md-6">
                                            <a href="../img/projects/<?=$featured['filename']?>-p.jpg" target="_blank">
                                                <i class="fa fa-search-plus" data-toggle="tooltip" data-placement="top" title="View"></i>
                                            </a>
                                        </div>
                                        <div class="col-md-6">
                                            <a href="#" class="image-delete">
                                                <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="Delete"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <img src="../img/projects/<?=$featured['filename']?>-p.jpg" class="img-responsive" >
                        </li>
                    <?php endwhile; ?>
                        <li class="col-md-2 featured-new">
                            <div class="image-hover" style="opacity: 1">
                                <div class="image-hover-content" style="margin-top: -20px;">
                                    <i class="fa fa-plus fa-2x"></i>
                                    <i class="fa fa-refresh fa-spin fa-2x" style="display: none"></i>
                                </div>
                            </div>
                            <img src="../img/blank35.png" class="img-responsive" style="width: 100%">
                        </li>

                </ul>
            </div>
        </div>
    </section>

    <section id="press" class="content">
        <div class="box box-info portfolio">
            <div class="box-header" style="border-bottom: 1px solid #ccc;">
                <h2 class="box-title" style="zoom: 1.5;"><i class="fa fa-file-image-o"></i> &nbsp; Press</h2>
                <div style="float: right;">
                    <a href="#modal-press-0" class="portfolio-link" data-toggle="modal">
                        <button class="btn btn-block btn-default btn-sm"><i class="fa fa-plus-circle"></i> &nbsp; New</button>
                    </a>
                </div>
            </div>
            <div class="box-body" style="background: #eee; padding: 10px 25px;">
                <ul class="sortable press row no-gutter">
                    <?php 
                    $press = array();
                    $result = $db->query("SELECT * FROM press WHERE deleted=0 ORDER BY `order` ASC");
                    while($article = mysqli_fetch_assoc($result)){
                        $press[] = $article;
                    }
                    foreach($press as $article):
                    ?>
                    <li class="col-md-1 portfolio-item">
                        <a href="#modal-press-<?=$article['id']?>" class="portfolio-link" data-toggle="modal">
                            <div class="portfolio-hover">
                                <div class="portfolio-hover-content">
                                    <i class="fa fa-file-image-o fa-3x"></i>
                                </div>
                            </div>
                            <img src="../img/projects/<?=$article['icon']?>.jpg" style="width: 100%;" class="img-responsive" alt="">
                        </a>
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </section>

    <section id="projects" class="content" style="margin-bottom: 1000px;">
        <div class="box box-info portfolio">
            <div class="box-header" style="border-bottom: 1px solid #ccc;">
                <h2 class="box-title" style="zoom: 1.5;"><i class="fa fa-home"></i> &nbsp; Projects</h2>
                <div style="float: right;">
                    <a href="#modal-edit-0" class="portfolio-link" data-toggle="modal">
                        <button class="btn btn-block btn-default btn-sm"><i class="fa fa-plus-circle"></i> &nbsp; New</button>
                    </a>
                </div>
            </div>
            <div class="box-body" style="background: #eee; padding: 10px 25px;">
                <ul class="sortable projects row no-gutter">
                    <?php 
                    $projects = array();
                    $result = $db->query("SELECT * FROM projects WHERE deleted=0 ORDER BY `order` ASC");
                    while($project = mysqli_fetch_assoc($result)){
                        $projects[] = $project;
                    }
                    foreach($projects as $project):
                    ?>
                    <li class="col-md-2 col-sm-6 portfolio-item" data-toggle="modal" data-id="<?=$project['id']?>">
                        <a href="#modal-edit-<?=$project['id']?>" class="portfolio-link" data-toggle="modal">
                            <div class="portfolio-hover">
                                <div class="portfolio-hover-content">
                                    <img src="../img/logo_white50.png" style="width: 60px;" alt="">
                                    <div class="details-button">View Project</div>
                                </div>
                            </div>
                            <img src="../img/projects/<?=getPrimaryImage($project['id'])?>-p.jpg" class="img-responsive" alt="">
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
                    </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        </div>
    </section>

    <?php 
        $new['id'] = 0;
        $new['title'] = "";
        $new['subtitle'] = "";
        $new['category'] = "";
        $new['url'] = "";
        $new['desc'] = "";
        $new['tags'] = "";
        array_unshift($projects,$new);
    ?>

    <?php foreach($projects as $project): ?>
        <div id="modal-edit-<?=$project['id']?>" class="modal modal-edit project-edit">
        <form id="project-edit-<?=$project['id']?>" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="type" value="projects">
            <input type="hidden" name="action" value="edit">
            <input type="hidden" name="id" value="<?=$project['id']?>">
            <input type="hidden" name="images">
            <input type="hidden" name="image-primary">
            <input type="hidden" name="deleted" value="0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title"><?= ($project['id']==0) ? "New" : "Edit" ?> Project</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row ">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Project Title</label>
                                    <input type="text" class="form-control" name="title" value="<?=$project['title']?>">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label>Sub-title</label>
                                    <input type="text" class="form-control" name="subtitle" value="<?=$project['subtitle']?>">
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div class="form-group">
                                    <label>Category</label>
                                    <select class="form-control" name="category">
                                        <option <?php if($project['category']=="Apartment") echo "selected" ?>>Apartment</option>
                                        <option <?php if($project['category']=="Commercial") echo "selected" ?>>Commercial</option>
                                        <option <?php if($project['category']=="Hotel") echo "selected" ?>>Hotel</option>
                                        <option <?php if($project['category']=="House") echo "selected" ?>>House</option>
                                        <option <?php if($project['category']=="Restaurant") echo "selected" ?>>Restaurant</option>
                                        <option <?php if($project['category']=="Retail") echo "selected" ?>>Retail</option>
                                        <option <?php if($project['category']=="In-Progress") echo "selected" ?>>In-Progress</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-8">
                                <div class="form-group">
                                    <label>URL</label>
                                    <span class="label-help url-validate url-available" <?php if($project['url']!="") echo "style='display: block;'"?>>
                                        <i class="fa fa-check"></i>
                                        That URL is available
                                    </span>
                                    <span class="label-help url-validate url-taken">
                                        <i class="fa fa-close"></i>
                                        That URL is not available
                                    </span>
                                    <div>
                                        <span style="line-height: 33px;">www.capitalcinteriors.com/</span>
                                        <input type="text" class="form-control" name="url" style="display: inline-block; width: 200px; float: right;" value="<?=$project['url']?>">  
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Tags</label>
                            <span class="label-help">Press 'enter' to start a new tag.</span>
                            <input type="text" class="form-control" name="tags" value="<?=$project['tags']?>" data-role="tagsinput">
                        </div>
                        <div class="form-group">
                            <label>Description</label>
                            <textarea class="form-control" rows="3" name="desc"><?=$project['desc']?></textarea>
                        </div>
                        <label>Images</label>
                        <span class="label-help">Drag/drop to re-order. Hover over image for additional options.</span>
                        <div class="well" style="padding: 5px 10px;">
                            <ul class="sortable row no-gutter" style="margin: 0 -5px;">
                                <?php 
                                $query = "SELECT * FROM projects_images WHERE project=".$project['id']." ORDER BY `order` ASC";
                                $result = $db->query($query);
                                while($image = mysqli_fetch_assoc($result)):
                                ?>
                                    <li class="col-md-4 project-image <?php if($image['primary']==1) echo 'primary'; ?>" data-id="<?=$image['filename']?>" style="padding: 5px; <?php if($project['id']==0) echo "display: none;";?>">
                                        <div class="image-hover">
                                            <div class="image-hover-content">
                                                <div class="row no-gutter" style="margin: 0 15px;">
                                                    <div class="col-md-4">
                                                        <a href="../img/projects/<?=$image['filename']?>.jpg" class="image-view" target="_blank">
                                                            <i class="fa fa-search-plus" data-toggle="tooltip" data-placement="top" title="View"></i>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="image-primary">
                                                            <i class="fa fa-star-o" data-toggle="tooltip" data-placement="bottom" title="Make primary image"></i>
                                                        </a>
                                                        <i class="fa fa-star"></i>
                                                    </div>
                                                    <div class="col-md-4">
                                                        <a href="#" class="image-delete">
                                                            <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="Delete"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img src="../img/projects/<?=$image['filename']?>-p.jpg" class="img-responsive" >
                                    </li>
                                <?php endwhile; ?>
                                <li class="col-md-4 image-new" style="padding: 5px;">
                                    <div class="image-hover" style="opacity: 1">
                                        <div class="image-hover-content" style="margin-top: -20px;">
                                            <i class="fa fa-plus fa-2x"></i>
                                            <i class="fa fa-refresh fa-spin fa-2x" style="display: none"></i>
                                        </div>
                                    </div>
                                    <img src="../img/blank35.png" class="img-responsive" style="width: 100%">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger project-delete pull-left">Delete</button>
                        <button type="submit" class="btn btn-primary" style="background: #fec503; border-color: #fec503;">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </form>
        <form class="image-upload" action="" method="post" enctype="multipart/form-data" style="opacity: 0;">
            <input type="file" name="image" />
        </form>
        </div>
    <?php endforeach; ?>

    <?php 
        $new = array();
        $new['id'] = 0;
        $new['title'] = "";
        $new['url'] = "";
        $new['icon'] = "000000";
        array_unshift($press,$new);
    ?>

    <?php foreach($press as $article): ?>
        <div id="modal-press-<?=$article['id']?>" class="modal modal-edit press-edit">
        <form id="press-edit-<?=$article['id']?>" action="" method="post" enctype="multipart/form-data">
            <input type="hidden" name="type" value="press">
            <input type="hidden" name="action" value="press">
            <input type="hidden" name="id" value="<?=$article['id']?>">
            <input type="hidden" name="images">
            <input type="hidden" name="deleted" value="0">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title"><?= ($article['id']==0) ? "New" : "Edit" ?> Press Article</h4>
                    </div>
                    <div class="modal-body">
                        <div class="row ">
                            <div class="col-md-9">
                                <div class="row ">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>Article Title</label>
                                            <input type="text" class="form-control" name="title" value="<?=$article['title']?>">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="form-group">
                                            <label>URL</label>
                                            <span class="label-help url-validate url-available" <?php if($article['url']!="") echo "style='display: block;'"?>>
                                                <i class="fa fa-check"></i>
                                                That URL is available
                                            </span>
                                            <span class="label-help url-validate url-taken">
                                                <i class="fa fa-close"></i>
                                                That URL is not available
                                            </span>
                                            <div>
                                                <span style="line-height: 33px;">www.capitalcinteriors.com/</span>
                                                <input type="text" class="form-control" name="url" style="display: inline-block; width: 250px; float: right;" value="<?=$article['url']?>">  
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <label>Publication Icon</label>
                                <div class="modal-press-icon <?php if($article['id']==0) echo 'new'?>">
                                    <div class="image-hover">
                                        <div class="image-hover-content">
                                            <div class="row no-gutter" style="margin-top: -8px;">
                                                <div class="col-md-12">
                                                    <a href="#" class="icon-new" target="_blank">
                                                        <i class="fa fa-refresh fa-2x" data-toggle="tooltip" data-placement="top" title="Replace"></i>
                                                        <i class="fa fa-plus fa-2x"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <img src="../img/projects/<?=$article['icon']?>.jpg" style="width: 100%;" class="article-icon img-responsive" alt="">
                                    <input type="hidden" name="icon" value="<?=$article['icon']?>">
                                </div>
                            </div>
                        </div>
                        <label>Images</label>
                        <span class="label-help">Drag/drop to re-order. Hover over image for additional options.</span>
                        <div class="well" style="padding: 5px 10px;">
                            <ul class="sortable row no-gutter" style="margin: 0 -5px;">
                                <?php 
                                $query = "SELECT * FROM press_images WHERE press=".$article['id']." ORDER BY `order` ASC";
                                $result = $db->query($query);
                                while($image = mysqli_fetch_assoc($result)):
                                ?>
                                    <li class="col-md-4 project-image" data-id="<?=$image['filename']?>" style="padding: 5px; <?php if($article['id']==0) echo "display: none;";?>">
                                        <div class="image-hover">
                                            <div class="image-hover-content">
                                                <div class="row no-gutter" style="margin: 0 15px;">
                                                    <div class="col-md-6">
                                                        <a href="../img/projects/<?=$image['filename']?>.jpg" class="image-view" target="_blank">
                                                            <i class="fa fa-search-plus" data-toggle="tooltip" data-placement="top" title="View"></i>
                                                        </a>
                                                    </div>
                                                    <div class="col-md-6">
                                                        <a href="#" class="image-delete">
                                                            <i class="fa fa-trash-o" data-toggle="tooltip" data-placement="top" title="Delete"></i>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <img src="../img/projects/<?=$image['filename']?>-p.jpg" class="img-responsive" >
                                    </li>
                                <?php endwhile; ?>
                                <li class="col-md-4 image-new" style="padding: 5px;">
                                    <div class="image-hover" style="opacity: 1">
                                        <div class="image-hover-content" style="margin-top: -20px;">
                                            <i class="fa fa-plus fa-2x"></i>
                                            <i class="fa fa-refresh fa-spin fa-2x" style="display: none"></i>
                                        </div>
                                    </div>
                                    <img src="../img/blank35.png" class="img-responsive" style="width: 100%">
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-danger project-delete pull-left">Delete</button>
                        <button type="submit" class="btn btn-primary" style="background: #fec503; border-color: #fec503;">Save</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </form>
        <form class="image-upload" action="" method="post" enctype="multipart/form-data" style="opacity: 0;">
            <input type="file" name="image" />
        </form>
        </div>
    <?php endforeach; ?>


    <!-- jQuery -->
    <script src="../vendor/jquery/jquery.min.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
    <!-- Bootstrap Core JavaScript -->
    <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
    <!-- Plugin JavaScript -->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
    <!-- ScrollReveal -->
    <script src="https://cdn.jsdelivr.net/scrollreveal.js/3.3.1/scrollreveal.min.js"></script>
    <!-- mousewheel -->
    <script type='text/javascript' src='../plugins/mousewheel/jquery.mousewheel.min.js'></script>
    <!-- scrollup -->
    <script type='text/javascript' src='../plugins/scrollup/src/jquery.scrollUp.js'></script>
    <!-- Tags -->
    <script src="//cdn.jsdelivr.net/bootstrap.tagsinput/0.4.2/bootstrap-tagsinput.min.js"></script>

    <script src="admin.js"></script>


</body>

</html>
