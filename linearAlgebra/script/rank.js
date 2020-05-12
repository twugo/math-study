document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ボタンが押されたら、行列式を計算する
    const calc_button = document.getElementById('calc_button');  
    calc_button.addEventListener('click', () => {
        const column = document.getElementById('matrix_column').value;
        const row = document.getElementById('matrix_row').value;
        if(column < 1 || row < 1){
            alert('適切な行列のサイズを入力してください。');
            return;
        }

        // 入力を取得
        const matrix_table = document.getElementById('matrix_table');
        let matrix = [];
        let count = 0;
        const table_elems = matrix_table.childNodes;
        for(const tr of table_elems){
            let tmp_array = [];
            for(const elem of tr.children){
                if(elem.tagName !== 'TD') continue;
                const value = elem.firstElementChild.value;
                if(value === ''){
                    alert('行列を入力してください。');
                    return;
                }
                tmp_array[count%column] = value;
                count++;
            }
            if(count/column - 1 >= 0){
                matrix[Math.floor(count/column - 1)] = tmp_array;
            }
        }

        // rankを計算
        document.getElementById('result').innerText = calc_rank(row, column, matrix);
    });
});

/**
 * calculate rank.
 * @param {number} m size of matrix column
 * @param {number} n size of matrix row
 * @param {Array.<number>} original_matrix matrix
 * @return {number} rank
 */
function calc_rank(m, n, original_matrix){
    // 元の行列を壊さないため行列のコピーを作成する
    let matrix = [];
    for(const row of original_matrix){
        matrix.push([...row]);
    }
    console.log(matrix);
    console.log('n:'+n);
    for(let i=0; i<m; i++){
        console.log('i' + i);
        if(i == n){
            console.log('n');
            return n;
        }
        if(matrix[i][i] == 0){
            let swap_flag = false;
            for(let column=i; column<n; column++){
                for(let row=i; row<m; row++){
                    if(matrix[row][column] != 0){
                        // 行と列を入れ替え
                        [matrix[i], matrix[row]] = [matrix[row], matrix[i]];
                        for(let k=0; k<m; k++){
                            [matrix[k][i], matrix[k][column]] = [matrix[k][column], matrix[k][i]];
                        }
                        swap_flag = true;
                        break;
                    }
                }
                if(swap_flag) break;
            }
            if(swap_flag === false){
                console.log('i');
                return i;
            }
        }
        
        const tmp_ii = matrix[i][i];
        for(let k=i; k<n; k++){
            matrix[i][k] /= tmp_ii;
        }
        for(let column=i+1; column<m; column++){
            const tmp = matrix[column][i];
            if(tmp == 0) continue;
            for(let row=i; row<n; row++){
                matrix[column][row] -= matrix[i][row] * tmp;
            }
        }
    }
    return m;
}