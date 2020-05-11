// 正方行列入力用テーブルを作成する。
// matrix_size フォームに入力された行列のサイズを元に
// matrix_table テーブルに正方行列入力用テーブルを作成する。

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // 行列のサイズ格納用
    const input_matrix_size = document.getElementById('matrix_size');
    let n = input_matrix_size.value;

    // 次数が入力されたら、入力された次数分の入力用テーブルを作成
    input_matrix_size.addEventListener('change', (ev) => {
        n = input_matrix_size.value;
        const frag = document.createDocumentFragment();

        //　表の1行めを作成
        const tr0 = document.createElement('tr');
        tr0.appendChild(document.createElement('th'));
        for(let i=1; i<=n; i++){
            const th = document.createElement('th');
            th.innerHTML = i;
            tr0.appendChild(th);
        }
        frag.appendChild(tr0);

        // 表の2行目以降を作成
        for(let i=1; i<=n; i++){
            const tr = document.createElement('tr');
            
            const th = document.createElement('th');
            th.innerHTML = i;
            tr.appendChild(th);
            for(let j=1; j<=n; j++){
                const td = document.createElement('td');
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                td.appendChild(input);
                tr.appendChild(td);
            }
            frag.appendChild(tr);
        }

        const matrix_table = document.getElementById('matrix_table');
        // 子要素を全部削除するため、テーブルを作り直す
        const new_matrix_table = matrix_table.cloneNode(false);
        matrix_table.parentNode.replaceChild(new_matrix_table, matrix_table);

        new_matrix_table.appendChild(frag);
    });    
});