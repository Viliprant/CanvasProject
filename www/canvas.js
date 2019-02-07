//TROUVER LE CONTEXTE
let context = document.getElementsByTagName("canvas")[0].getContext("2d");

//FUNCTIONS  ----------------------------------------------------------

//POUR LES FONDS
function CreateRect(x,y,width,height,color)
{
		context.fillStyle = color;
		context.fillRect(x,y,width,height);
}

function CreateImage(x,y,width,height,image)
	{
		let MonImage = new Image(width, height);
		MonImage.addEventListener("load", function(event) {
			console.log(context);
  			context.drawImage(MonImage,x,y,width,height);
		}, false);
		MonImage.src = image;
	}

//RECUPERER LES LIGNES D'ENTREE
function input()
	{

	}

//AGIR EN CONSEQUENCE DES INPUTS SUR LES VARIABLES
function animate()
	{
		for (carre of ArmeeDeCarres) {

			GestionDesBord(carre);
		

			carre.position.x += carre.vitesse.x * carre.direction.x;
			carre.position.y += carre.vitesse.y * carre.direction.y;
		}
	}

// AFFICHER A L'ECRAN LES ELEMENTS
function render()
	{
		// BORDURE
		CreateRect(0,0,600,400,"#a1bdea");

		// BACKGROUND
		CreateRect(5,5,caneva.width,caneva.height,"white");
		
		// CARRE MOBILE
		for (carre of ArmeeDeCarres) {
			carre.CreateRect(carre.position.x, carre.position.y, carre.carre.width, carre.carre.height, carre.color);
		}
	}

function GameLoop()
	{
		input();
		
		animate();
		
		render();

		window.requestAnimationFrame(GameLoop);
	}

//POUR LES SOLDATS
function CreateCarre()
	{
		let propriete = {	position : {x : 5, y : 5},
							vitesse : {x : 3, y : 3},
							direction : {x : 1, y : 1},
							carre : {width : 20 , height : 20},
							color : "black",
							CreateRect : function(x,y,width,height,color){
								context.fillStyle = color;
								context.fillRect(x,y,width,height);
							}
						};
		return propriete;
	}

// GERE LES COLLISIONS AVEC LES BORDS
function GestionDesBord(carre)
	{
		if(carre.position.x > caneva.width - carre.carre.width)
		{
			carre.position.x = caneva.width - carre.carre.width;
			carre.direction.x = - Math.random() - 0.5;
			ControleurArmee(carre)
		}
		if(carre.position.x < 5)
		{
			carre.position.x = 5;
			carre.direction.x = Math.random() + 0.5;
			ControleurArmee(carre)
		}
		if(carre.position.y > caneva.height - carre.carre.height)
		{
			carre.position.y = caneva.height - carre.carre.height;
			carre.direction.y = - Math.random() - 0.5;
			ControleurArmee(carre)
		}
		if(carre.position.y < 5)
		{
			carre.position.y = 5;
			carre.direction.y = Math.random() + 0.5;
			ControleurArmee(carre)
		}
	}

// GERE LES SOLDATS  !!!
function ControleurArmee(carre)
{
	let nbSoldatsMax = 100,
		color = ["red","blue","green","purple","yellow","pink","salmon","cyan", "magenta"],
		indexRandom;
	if(ArmeeDeCarres.length > nbSoldatsMax)
	{
		indexRandom = Math.trunc(Math.random() * 10);
		carre.color = color[indexRandom];
	}
	else
	{
		ArmeeDeCarres.push(CreateCarre());
	}
}
//---------------------------------------------------------------------

let caneva = {width : 590 , height : 390},
	ArmeeDeCarres = [];
	ArmeeDeCarres.push(CreateCarre());

GameLoop();