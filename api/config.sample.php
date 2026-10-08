<?php
// Copy to api/config.php and fill in. Never commit config.php.
return [
  'driver' => 'mysql',          // 'mysql' (Hostinger) or 'sqlite' (local testing)
  'host' => 'localhost', 'name' => 'u123456789_dgfans', 'user' => 'u123456789_dg', 'pass' => 'CHANGE_ME',
  'sqlite_path' => __DIR__ . '/../storage/test.sqlite',
];
