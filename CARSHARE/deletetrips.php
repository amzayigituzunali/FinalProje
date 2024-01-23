<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include('connection.php');
$sql="DELETE FROM carsharetrips WHERE trip_id='".$_POST['trip_id']."'";
$result = mysqli_query($link, $sql);
?>