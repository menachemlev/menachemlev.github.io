const container_elm = document.querySelector(".container");
const menu_elm = document.querySelector(".menu");
const flags_left_elm = document.querySelector(".flags-left");
const tiles_amount_selector = document.querySelector(".tiles-amount-selector");
const difficulty_selector = document.querySelector(".difficulty-selector");
const is_mobile = mobile_check();
document.querySelector(".restart-btn").addEventListener("click", restart_game);
tiles_amount_selector.addEventListener("change", restart_game);
difficulty_selector.addEventListener("change", restart_game);
let game_is_on;

function set_styles() {
  const is_landspace = window.innerWidth > window.innerHeight * 1.3;
  container_elm.style.width = is_landspace ? "45vw" : "95vw";
  container_elm.style.height = is_landspace ? "80vh" : "70vh";
  menu_elm.style.width = is_landspace ? "45vw" : "90vw";
  menu_elm.style.height = is_landspace ? "10vh" : "30vh";
}

function init() {
  container_elm.innerHTML = "";
  set_styles();
}

function process_game_over() {
  game_is_on = false;
  setTimeout(
    container_elm.insertAdjacentHTML(
      "afterbegin",
      `<div class='gameover'>😢GAME OVER</div>`
    ),
    300
  );
}

function process_victory() {
  game_is_on = false;
  setTimeout(
    container_elm.insertAdjacentHTML(
      "afterbegin",
      `<div class='win'>🏆Victory</div>`
    ),
    300
  );
}

function mobile_check() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}

function restart_game() {
  const handle_flag = (tile) => {
    if (tile.elm.textContent == "") {
      if (flags_num == 0) return;
      tile.elm.textContent = "🚩";
      flags_num--;
      if (tile.is_bomb) bombs_num--;
      if (bombs_num == 0) return process_victory();
    } else if (tile.elm.textContent == "🚩") {
      tile.elm.textContent = "";
      flags_num++;
    } else;
    flags_left_elm.textContent = flags_num;
  };
  const get_surrounding_tiles = (tile) =>
    tile_objs.filter(
      (t) =>
        Math.abs(tile.col - t.col) <= 1 &&
        Math.abs(tile.row - t.row) <= 1 &&
        !(t.col == tile.col && t.row == tile.row)
    );
  const show_surrounding_tiles = (tile, already_handeld_zeros = []) => {
    tile.elm.style.background = "grey";
    tile.elm.style.borderColor = "white";
    tile.elm.textContent = " ";
    already_handeld_zeros.push(tile);
    const surrounding_num_tiles = get_surrounding_tiles(tile).filter(
      (t) =>
        !t.is_bomb &&
        !already_handeld_zeros
          .map((t) => `${t.col}${t.row}`)
          .includes(`${t.col}${t.row}`)
    );
    surrounding_num_tiles.forEach((t) => {
      const surrounding_bombs_n = get_surrounding_tiles(t).filter(
        (t) => t.is_bomb
      ).length;
      if (surrounding_bombs_n) {
        t.elm.textContent = surrounding_bombs_n;
        t.elm.style.background = "white";
      } else {
        show_surrounding_tiles(t, already_handeld_zeros);
      }
    });
  };
  const process_tile_obj = (col, row) => {
    return {
      col,
      row,
      is_bomb: false,
      elm: document.createElement("div"),
      handle_click: function () {
        if (!game_is_on) return;
        if (this.elm.textContent != "") return;
        this.elm.style.background = "white";
        if (this.is_bomb) {
          this.elm.textContent = "💣";
          return process_game_over();
        } else {
          const surrounding_bombs = get_surrounding_tiles(this).filter(
            (t) => t.is_bomb
          ).length;
          if (!surrounding_bombs) return show_surrounding_tiles(this);
          this.elm.textContent = surrounding_bombs;
        }
      },
      init: function () {
        this.is_bomb = Math.random() > 1 - 0.15 * difficulty;
        if (this.is_bomb) bombs_num++;
        this.elm.classList.add("tile");
        Object.assign(this.elm.style, {
          height: `${100 / tiles_sqrt}%`,
          width: `${100 / tiles_sqrt}%`,
          top: `${(col * 100) / tiles_sqrt}%`,
          left: `${(row * 100) / tiles_sqrt}%`,
        });
        const _this = this;
        if (is_mobile) {
          let touch_timeout,
            is_flagged = false;
          this.elm.addEventListener("touchstart", () => {
            if (game_is_on)
              touch_timeout = setTimeout(() => {
                is_flagged = true;
                handle_flag(this);
              }, 300);
          });
          this.elm.addEventListener("touchcancel", () => {
            clearTimeout(touch_timeout);
            is_flagged = false;
          });
          this.elm.addEventListener("touchend", () => {
            clearTimeout(touch_timeout);
            if (game_is_on && !is_flagged) this.handle_click.call(_this);
            is_flagged = false;
          });
        } else
          this.elm.addEventListener("click", this.handle_click.bind(_this));
      },
    };
  };
  init();
  game_is_on = true;
  const difficulty = +difficulty_selector.value;
  const tiles_num = +tiles_amount_selector.value;
  const tiles_sqrt = Math.sqrt(tiles_num);
  const tile_objs = [];
  let bombs_num = 0;
  for (let i = 0; i < tiles_sqrt; i++) {
    for (let j = 0; j < tiles_sqrt; j++) {
      tile_objs.push(process_tile_obj(i, j));
      const [tile] = tile_objs.slice(-1);
      tile.init();
      container_elm.insertAdjacentElement("afterbegin", tile.elm);
    }
  }

  let flags_num = bombs_num;
  flags_left_elm.textContent = flags_num;
  window.addEventListener("mousedown", (e) => {
    if (!game_is_on) return;
    if (e.which == 3) {
      for (const tile of tile_objs) {
        const { top, left, right, bottom } = tile.elm.getBoundingClientRect();
        if (
          e.clientX >= left &&
          e.clientX <= right &&
          e.clientY >= top &&
          e.clientY <= bottom
        )
          handle_flag(tile);
      }
    }
  });
}
setInterval(set_styles, 1000);
restart_game();
/*
DEBUG:
  show_content = () =>
    tile_objs.forEach((t) => {
      t.elm.textContent = t.is_bomb
        ? "💣"
        : get_surrounding_tiles(t).filter((t) => t.is_bomb).length;
    });
  show_content();
  */
