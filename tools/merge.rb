#!/usr/bin/env ruby

puts "Merging all pentagine's source files into pentagine.js.\n\n"

files_names = ["src/pentagine.js"]

merged_file = File.new("build/pentagine.js", "w")

files_names.each do |file_name|
  merged_file.write(File.open(file_name).read() + "\n")
end

puts "\nMerged all files successfully."
