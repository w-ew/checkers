function number_of(piece, board) {
    var number = 0;
    for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			if (board[y][x] == piece){
                number++;
			}
		}
    }
    return number;
}
function board_value(board) {
    return 1.5*number_of(WQ, board) + number_of(W, board) - 1.5*number_of(BQ, board) - number_of(B, board);
}

function make_move(hop, board) {  
    board[hop.to.y][hop.to.x] = board[hop.from.y][hop.from.x];
    board[hop.from.y][hop.from.x] = E;			
    return board;
}

function min_max(board, depth) {
    return max_move(board);
};

function max_move(board, depth) {
    if (depth <= 0) { 
        
    }
    else {
        moves = possible_moves(board);
        best_move = moves[0];
        best_move_value = board_value(board);        
        for (var i=0 ; i<moves.length ; i++) {
            var board = make_move(moves[i], board);
            var move = min_move(board, depth - 1);

            var value = board_value(board);

            if (value > best_move_value) {
                best_move = moves[i];
                best_move_value = value;
            }
        }
		return best_move;
    }
}

function min_move(board, depth) {
    
    moves = possible_moves(board);
    best_move = moves[0];
    best_move_value = board_value(board);        
    for (var i=0 ; i<moves.length ; i++) {
        var board = make_move(moves[i], board);
        var move = max_move(board, depth - 1);

        var value = board_value(board);
        if (value < best_move_value) {
            best_move = moves[i];
            best_move_value = value;
        }
    }
    return best_move;
}

function get_successors(x, y) { //iterate through every square and find all posible succesors
	var successors = [];
	for(var y_s = 0; y_s < 8; y_s++) {
		for(var x_s = 0; x_s < 8; x_s++) {
			if (belongs_to(game.fields[y_s][x_s]) == E ){
				var hop = { from: { x:x, y:y }, to: { x:x_s, y:y_s } };
				if (game.is_valid_hop(B, hop)) {
					successors.push(hop);
				}
			}
		}
	}
	return successors;
}

function possible_moves(board) { // itarate through every square and find all successors for black men
	var successors = [];
	for(var y = 0; y < 8; y++) {
		for(var x = 0; x < 8; x++) {
			if (belongs_to(game.fields[y][x]) == B ){
				successors = successors.concat(get_successors(x, y));
			}
		}
	}
	return successors;
}
