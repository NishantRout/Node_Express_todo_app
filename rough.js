var itemOne = Todo({item: 'buy flowers'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});