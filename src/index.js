import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './assets/images/honda.jpg';
import './assets/images/suzuki.jpg';
import './assets/images/ducati.jpg';
import './assets/images/triumph.jpg';
import Character from "./js/character";
import Monster from "./js/monster";
import Battle from "./js/battle";
import Shop from "./js/shop";
import { Honda, Suzuki, Ducati, Triumph } from "./js/class";

function updateList(listItems, className) {
  let listHTML = "<ul>";
  listItems.forEach((item) =>{
    listHTML += `<li class='${className}'> ${item.ToString()}`;
  });
  return listHTML += "</ul>";
}

function updateBattleUI(battle) {
  $("#characterHP").text(`${battle.character.hp}: -${battle.monsterDamage}`);
  $("#monsterHP").text(`${battle.monster.hp}: -${battle.characterDamage}`);
  $("#nameDisplay").text(battle.character.name);
  $("#monsterName").text(battle.monster.name + " Squid");
}

function toggleBattleUI() {
  $("shopScreen").toggle();
  $("battleScreen").toggle();
}

$(document).ready(function() {
  let player;
  let monster;
  let battle;
  let shop;
  let level;

  $("shopScreen").hide();
  $("gameOver").hide();
  $("#battleScreen").hide();

  $("form").on("submit", (e) => {
    e.preventDefault();
    let charClass;
    switch ($("#charClass").val()) {
      case "honda": charClass = new Honda(); $("#characterImg").attr("src", "./assets/images/honda.jpg"); break;
      case "suzuki": charClass = new Suzuki(); $("#characterImg").attr("src", "./assets/images/suzuki.jpg"); break;
      case "ducati": charClass = new Ducati(); $("#characterImg").attr("src", "./assets/images/ducati.jpg"); break;
      case "triumph": charClass = new Triumph(); $("#characterImg").attr("src", "./assets/images/triumph.jpg"); break;
    }
    player = new Character($("#charName").val(), charClass);
    monster = Monster.CreateMonster(1)
    level = 1;
    $("#battleScreen").show();
    $("#charSelect").hide();
    battle = new Battle(monster, player);
    updateBattleUI(battle);
  });

  $("#charAttack").on("click", function() {
    let result = battle.Turn("attack");
    updateBattleUI(battle);
    if (result === "win") {
      level ++ ;
      $("charInventory").html(updateList(player.inventory.items, "playerItem"));

      shop = new Shop(5, monster.level);
      toggleBattleUI();

      $("#shopInventory").html(updateList(shop.inventory.items, "shopItem"));
      $("#money").text(player.money + "$");

      $(".shopItem").on("click", function() {
        if(shop.BuyItem(player, $(this).text().trim())) {
          $(this).remove();
          $("#money").text(player.money + "$");
          $("#charInventory").html(updateList(player.inventory.items, "playerItem"));
        }
      });
    }
    else if (result === "lose") {
      $("#gameOver").show();
      $("#battleScreen").hide();
      $("#restart").on("click", function() {
        $("#gameOver").hide();
        $("#charSelect").show();
      });
    }
  });
  $("#sell").on("click", function() {
    $(".playerItem").off("click");
    $(".playerItem").on("click", function() {
      shop.SellItem(player, $(this).text().trim());
      $("#money").text(player.money +"$");
      $("#charInventory").html(updateList(player.inventory.items, "playerItem"));
    });
  });

  $("#equip").on("click", function() {
    $(".playerItem").off("click");
    $(".playerItem").on("click", function() {
      if (player.EquipItem($(this).text().trim()) === "Success") {
        $(this).remove();
        $("#charGear").html(updateList(player.equipment, "equipItem"));
      }
    });
    $(".equipItem").off("click");
    $(".equipItem").on("click", function() {
      player.RemoveItem($(this).text().trim());

      $("#charInventory").html(updateList(player.inventory.items, "playerItem"));
      $("#charGear").html(updateList(player.equipment, "equipItem"));
    });
  });
  $("#nextLevel").on('click', function() {
    toggleBattleUI();
    monster = Monster.CreateMonster(level);
    battle = new Battle(monster, player);
    updateBattleUI(battle);
  });
});