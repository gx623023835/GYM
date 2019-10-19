define("js/food.js",function(require,exports,module){var $=require("jquery");var _=require("underscore");var form=require("form");var lib=require("lib");var saveLocal=require("saveLocal");var SearchSuggest=require("js/libs/suggest/suggestFood.js?3ac694669fa0fb8a");var T={getBMI:function getBMI(height,weight){var height=height/100;return(weight/(height*height)).toFixed(1)},getWeightFromBMI:function getWeightFromBMI(height,bmi){var weight=bmi*(height/100)*(height/100);return weight},getWeight:function getWeight(height,sex){var res;if(sex==1){res=(height-80)*.7}else if(sex==2){res=(height-70)*.6}return res.toFixed(1)},calRange:function calRange(){var target=$("#toolsForm input[name='target']:checked").val(),height=$("input[name='height']").val(),curWeight=parseFloat($("input[name='weight']").val()),objTargetWeight=$("#toolsForm input[name='target_weight']"),sugWeight;if(!curWeight||!target){return}objTargetWeight.removeAttr("disabled");if(target==1){sugWeight=curWeight*1.1;if(height){var weightBmi1=T.getWeightFromBMI(height,28);weightBmi1=weightBmi1>curWeight?weightBmi1:sugWeight;sugWeight=weightBmi1>sugWeight?sugWeight:weightBmi1}sugWeight=curWeight.toFixed(1)+" ~ "+sugWeight.toFixed(1);objTargetWeight.attr("placeholder",sugWeight).val("")}else if(target==2){sugWeight=curWeight*.85;if(height){var weightBmi2=T.getWeightFromBMI(height,18.5);weightBmi2=weightBmi2<curWeight?weightBmi2:sugWeight;sugWeight=weightBmi2<sugWeight?weightBmi2:sugWeight}sugWeight=sugWeight.toFixed(1)+" ~ "+curWeight.toFixed(1);objTargetWeight.attr("placeholder",sugWeight).val("")}else{sugWeight=curWeight.toFixed(1);objTargetWeight.attr("disabled","disabled").val(curWeight)}},checkRange:function checkRange(){var $el=$("input[name='target_weight']");var userInput=parseFloat($el.val());var curWeight=$("input[name='weight']").val();var target=parseInt($("#toolsForm input[name='target']:checked").val());var tips="";var flag=true;switch(target){case 1:if(curWeight>userInput){tips="增肌的目标体重不能低于当前体重";flag=false}break;case 2:if(curWeight<userInput){tips="减肥的目标体重不能高于当前体重";flag=false}break}if(flag){$("#bmiTips").removeClass("error").hide()}else{$("#bmiTips").removeClass("warn").addClass("error").text(tips).show()}},checkBMI:function checkBMI(){var height=$("input[name='height']").val();var weight=$("input[name='weight']").val();if(!height||height<100||!weight||weight<10){$("#bmiTips").removeClass("error").hide();return}var BMI=T.getBMI(height,weight);if(BMI<18.5){$("#bmiTips").removeClass("error").addClass("warn").text("当前体重低于健康值，建议选择增肌").show()}else if(BMI>28){$("#bmiTips").removeClass("error").addClass("warn").text("当前体重超出健康值，建议选择减肥").show()}else{$("#bmiTips").removeClass("warn").hide()}}};function init(){var jqInput=$("#acTrigger3");var ss=new SearchSuggest(jqInput,{wrapper:'<div class="food-search-tips"></div>',hotDataUrl:"/food/SearchSuggest?name=",actionUrl:"/food/search?kw=",dataUrl:"/food/SearchSuggest",offsetDelta:{x:0,y:1}});ss.compiledTemplate=_.template(ss.options.template);$("#asideSearchForm").on("click",".btn-submit",function(e){if(!$("#acTrigger3").val()){location.href="/food/index/"}else{$("#asideSearchForm").submit()}return false});$("#asideSearchForm").on("submit",function(e){var action=$(this).attr("action");if(action){window.open(action,"_self")}return false});$(".submit-bt").on("click",function(){var fData=form.getFormData("#toolsForm");var tipsObj=$("#bmiTips");if(!fData.age){lib.showTip("年龄不能为空");return}if(!fData.height){lib.showTip("身高不能为空");return}if(!fData.weight){lib.showTip("体重不能为空");return}if(!fData.target_weight){lib.showTip("请填写目标体重");return}if(!fData.target){lib.showTip("请选择目标");return}if(tipsObj.hasClass("error")){lib.showTip(tipsObj.text());return}saveLocal.formSave("#toolsForm");location.href="/tools/HealthyFood?age="+fData.age+"&height="+fData.height+"&weight="+fData.weight+"&factor="+fData.factor+"&target="+fData.target+"&target_weight="+fData.target_weight+"&sex="+fData.sex});$("#toolsForm input[name='target']").on("change",function(){T.calRange();T.checkRange()});$("input[name='target_weight']").on("input",function(){T.checkRange()});$("input[name='weight']").on("input",function(){T.calRange();T.checkRange();T.checkBMI()});$("input[name='height']").on("input",function(){T.checkBMI()});var nutrObj=$("#nutr-info");$(".info-nurt").on("click",".btn-nutr",function(){var _ts=$(this);if(nutrObj.hasClass("close")){nutrObj.removeClass("close");_ts.show().text("简要>>")}else{nutrObj.addClass("close");_ts.text("详细>>")}});saveLocal.formInit("#toolsForm")}exports.init=init});