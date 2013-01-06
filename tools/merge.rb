#!/usr/bin/env ruby

puts "Merging all pentagine's source files into pentagine.js.\n\n"

files_names = ["src/Animation.js", "src/Drawing.js", "src/SpriteList.js",
               "src/Camera.js", "src/Input.js", "src/Sprite.js",
               "src/stats.min.js", "src/main.js"]

merged_file = File.new("build/pentagine.js", "w")

files_names.each do |file_name|
  merged_file.write(File.open(file_name).read() + "\n")
end

puts "\nMerged all files successfully."
