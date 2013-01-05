#!/usr/bin/env ruby

puts "Merging all pentagine's source files into pentagine.js.\n\n"

# Read all files
files_names = ["src/Animation.js", "src/Drawing.js", "src/SpriteList.js",
               "src/Camera.js", "src/Input.js", "src/Sprite.js", "src/main.js"]

files_contents = []

for i in 0..files_names.length - 1 do
  files_contents << File.open(files_names[i]).read()
  puts "  Reading " + files_names[i]
end

puts 

# Merge all files
merged_file_name = "build/pentagine.js"
merged_file = File.new(merged_file_name, "w")

for i in 0..files_contents.length - 1 do
  merged_file.write(files_contents[i])
  puts "  Joining " + files_names[i]
end

puts "\nMerged all files successfully."
