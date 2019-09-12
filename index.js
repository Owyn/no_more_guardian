
module.exports = function no_guardian(d)
{
	let clr = 0;
	let entered = false;
	
	d.hook('S_FIELD_EVENT_ON_ENTER', 'raw', () => {  
			entered = true;
			return false;
	});
	
	d.hook('C_RETURN_TO_LOBBY', 'raw', () => {  
			entered = false;
	});
	
	d.hook('S_FIELD_POINT_INFO', 2, (event) => {       
		if(entered && event.cleared != clr && event.cleared - 1 > event.claimed) // entered GM, updated progress, unclaimed rewards
		{
			d.toClient('S_CHAT', 3, {
			channel: 21,
			gm: 1,
			name: 'Guardian Mission',
			message: String(event.cleared + " / 40")
			});
		}
		clr = event.cleared;
	});
}