#!/usr/bin/env ruby

# Get all the settings
print "Name: "
name = gets.chomp
print "Generate index.html? [Y/n] "
generate_html = gets.chomp
print "Add example to examples list? [Y/n] "
add_to_list = gets.chomp

# Create a folder
folder_name = name.gsub(" ", "_").downcase
Dir::mkdir("demos/" + folder_name)

# Generate index.html
if generate_html.downcase != "n" then
  index_html = "<!DOCTYPE html><html>
  <head>
    <title>%s</title>
    <meta charset=\"utf-8\">
  </head>

  <body style=\"margin: 0px;\">
    <canvas id=\"canvas\" width=\"800\" height=\"640\">
  </body>

  <!-- Include Pentagine -->
  <script src=\"../../src/stats.min.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/main.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/Drawing.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/Camera.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/Sprite.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/SpriteList.js\" type=\"text/javascript\"></script>
  <script src=\"../../src/Input.js\" type=\"text/javascript\"></script>

  <!-- Include game classes -->
  <!-- <script src=\"PlayState.js\" type=\"text/javascript\"></script> -->
</html>" % [name]

  index_html_file = File.new("demos/" + folder_name + "/index.html", "w")
  index_html_file.write(index_html + "\n")
  index_html_file.close
end

# Add new example to examples list on examples/index.html
if add_to_list.downcase != "n" then
  old_html_list = File.open("demos/index.html").read().split("\n")
  new_html_file = File.new("demos/index.html", "w")

  new_line = "\n      <li><a href=\"%s\">%s</a></li>\n" % [folder_name + "/index.html", name]

  new_html_file.write(old_html_list[0..11].join("\n") + new_line + old_html_list[12..old_html_list.length - 1].join("\n"))
  new_html_file.close
end
