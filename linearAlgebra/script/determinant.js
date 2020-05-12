document.addEventListener('DOMContentLoaded', () => {
    'use strict';
    
    // ボタンが押されたら、行列式を計算する
    const button = document.getElementById('button');
    button.addEventListener('click', () => {
        const n = document.getElementById('matrix_size').value;
        if(n < 1){
            alert('適切な行列のサイズを入力してください。');
            return;
        }

        // 入力を取得
        const matrix_table = document.getElementById('matrix_table');
        let matrix = [];
        let count = 0;
        const table_elems = matrix_table.childNodes;
        for(let tr of table_elems){
            let tmp_array = [];
            for(let elem of tr.children){
                if(elem.tagName !== 'TD') continue;
                const value = elem.firstElementChild.value;
                if(value === ''){
                    alert('行列を入力してください。');
                    return;
                }
                tmp_array[count%n] = value;
                count++;
            }
            if(count/n - 1 >= 0){
                matrix[Math.floor(count/n - 1)] = tmp_array;
            }
        }

        //　行列式を計算 
        document.getElementById('result').innerText = calc_determinant(n, matrix);
    });
});

/**
 * calculate determinant.
 * @param {number} n size of matrix
 * @param {Array.<number>} original_matrix matrix
 */
function calc_determinant(n, original_matrix){
    // 元の行列を壊さないため行列のコピーを作成する
    let matrix = [];
    for(const row of original_matrix){
        matrix.push([...row]);
    }

    let result = 1;
    for(let i=0; i<n; i++){
        if(matrix[i][i] == 0){
            for(let r=i+1; r<n; r++){
                if(matrix[r][i] == 0){
                    if(r===n-1) return 0;
                    continue;
                }
                [matrix[i], matrix[r]] = [matrix[r], matrix[i]];
                result *= -1;
                break;
            }
        }
        for(let r=i+1; r<n; r++){
            if(matrix[r][i] != 0){
                const tmp = matrix[r][i] / matrix[i][i];
                for(let j=i; j<n; j++){
                    matrix[r][j] -= matrix[i][j] * tmp;
                }
            }
        }
        result *= matrix[i][i];
    }
    return result;
}