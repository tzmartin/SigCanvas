SC.ui = {
	thumb1 : '',
	createSigWindow : function() {
		
		SC.ui.signatureView = Ti.UI.createWebView({url:'js/SignatureWindow.nojQuery.html',width:250,height:460,left:10,borderColor:'#999'});
		SC.ui.canvasWin = Ti.UI.createWindow({title:'Canvas',backgroundColor:'#FFF',modal:'true',navBarHidden:true,statusBarHidden:true});
		SC.ui.btnSave = Titanium.UI.createButton({title:'Save',height:40,width:100,top:40,left:240,opacity:1,font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},anchorPoint:{x:0.5,y:0.5}});
		SC.ui.btnCancel = Titanium.UI.createButton({title:'Cancel',height:40,width:100,bottom:40,left:240,opacity:1,font:{fontSize:18,fontWeight:'bold',fontFamily:'Helvetica Neue'},anchorPoint:{x:0.5,y:0.5}});
		SC.ui.label1 = Ti.UI.createLabel({
			text:'Signature',
			color:'#000',
			width:150,
			height:'auto',
			textAlign:'center',
			font:{fontSize:20,fontWeight:'normal',fontFamily:'Arial'},
			top:220,
			left:210,
			anchorPoint:{x:0.5,y:0.5}
		});
		
		// Events
		SC.ui.btnSave.addEventListener('click',function(){
			
			// toImage() is throwing an "unrecognized type" error on Android.  Ignore for now...
			if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
				var image = SC.ui.signatureView.toImage(); 
				// Save Image File
				var filename = Titanium.Filesystem.applicationDataDirectory + "/tmp.jpg";
				f = Titanium.Filesystem.getFile(filename);
				f.write( image );

				// Update thumb
				SC.ui.thumb1.backgroundImage = filename;
			}
			// Close Window
			SC.ui.canvasWin.close();
		});

		SC.ui.btnCancel.addEventListener('click',function(){
			if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
				SC.ui.signatureView.repaint();
			}
			SC.ui.canvasWin.close();
		});
		
		// Show Report Window
		SC.ui.canvasWin.add(SC.ui.label1);
		SC.ui.canvasWin.add(SC.ui.btnSave);
		SC.ui.canvasWin.add(SC.ui.btnCancel);
		SC.ui.canvasWin.add(SC.ui.signatureView);
		
		SC.ui.rotateElements(function() {
			SC.ui.canvasWin.open();
		});
		
	},
	rotateElements : function(callb) {
		// Rotate to landscape position
		var a = Titanium.UI.createAnimation();		
		a.transform = Ti.UI.create2DMatrix().rotate(-90);
		
		SC.ui.btnSave.animate(a);
		SC.ui.btnCancel.animate(a);
		SC.ui.label1.animate(a);
		
		if (callb) {callb();}
	}
};

/*  
	Initialize App 
*/
SC.init = function() {
	//Ti.API.log('Opening Dashboard');
	
	var win = Ti.UI.createWindow({title:'SigCanvas',backgroundColor:'#FFF'});
	
	var btn1 = Ti.UI.createButton({title:'New SigWindow',width:150,height:50,top:50});
	var label1 = Ti.UI.createLabel({text:'Preview',width:150,height:30,top:130,textAlign:'center'});
	SC.ui.thumb1 = Ti.UI.createView({width:150,height:150,top:190,borderRadius:10,borderColor:'#999'});
	
	// Add Event Listeners
	btn1.addEventListener('click',function(){
		SC.ui.createSigWindow();
	});
	
	win.add(btn1);
	win.add(label1);
	win.add(SC.ui.thumb1);
	
	win.open();
	
};