function TemplateBuilder(){
}

TemplateBuilder.BUILD_MODE = {
	NORMAL : 1,
	IMAGE_MAP : 2,
	BITLY : 3,
	IMAGE_MAP_WITH_BITLY : 4
}

TemplateBuilder.create = function(FileSystem, JSDOM, name, htmlToolKit, templateFile, outputDirectory, buildMode){
	name = name.replace(/\s/g, "");
	//var output = "<span>test3</span>";
	var outputFile = outputDirectory + "/" + name;


	FileSystem.readFile(templateFile, "utf-8", function(error, data){
		if(error){
			console.log(error);
			throw error;
		}
		//console.log("Reading: " + data);
		var document = JSDOM(data);
		var window = document.parentWindow;

		console.log(window.document.innerHTML)
		var links = window.document.getElementsByTagName("a");
		console.log(links);

		switch(buildMode){
			case TemplateBuilder.BUILD_MODE.IMAGE_MAP:
				TemplateBuilder.imageMap(data, outputFile + ".jpg");
				break;
			default:
				break;
		}

		//
		//manipulate template here

		FileSystem.writeFile(outputFile, data, function(error){
			if(error){
				console.log(error);
				throw error;
			}
			//console.log(data);
			//console.log("Saved!");
		});

	});

	
}

TemplateBuilder.imageMap = function(html, outputFile){
	htmlToolKit.htmlToImage(templateFile, outputFile, 800, 0);
	//to do --- upload generated image to hosting

}

TemplateBuilder.test = function(){
	
}

TemplateBuilder.processTokenValues = function(){

}

TemplateBuilder.createWithBitly = function(){

}

TemplateBuilder.createWithImageMapAndBitly = function(){

}


module.exports = TemplateBuilder;