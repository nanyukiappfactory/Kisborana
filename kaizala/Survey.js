var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Survey;
(function (Survey) {
    var SurveyCheckboxSettingView = /** @class */ (function (_super) {
        __extends(SurveyCheckboxSettingView, _super);
        function SurveyCheckboxSettingView() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SurveyCheckboxSettingView;
    }(KASClient.UI.KASCheckboxView));
    Survey.SurveyCheckboxSettingView = SurveyCheckboxSettingView;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveySliderSwitchSettingView = /** @class */ (function () {
        function SurveySliderSwitchSettingView(title, switchToogleCallback) {
            this.title = "";
            this.switchToogleCallback = null;
            this.checkboxInput = null;
            this.title = title;
            this.switchToogleCallback = switchToogleCallback;
        }
        SurveySliderSwitchSettingView.prototype.getView = function () {
            var settingView = KASClient.UI.getElement("div", { "height": "48px", "margin": "0", "margin-bottom": "11px", "display": "flex", "flex-direction": "row", "align-items": "center" });
            var titleLabelAttributes = {
                "flex": "1",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("14px")
            };
            var titleLabel = KASClient.UI.getElement("label", titleLabelAttributes);
            titleLabel.innerText = this.title;
            KASClient.UI.addElement(titleLabel, settingView);
            // Slider Switch view
            var sliderSwitch = KASClient.UI.getElement("label");
            sliderSwitch.className = "switch";
            this.checkboxInput = KASClient.UI.getElement("input");
            this.checkboxInput.type = "checkbox";
            this.checkboxInput.className = "sliderInput";
            this.checkboxInput.onchange = function () {
                this.switchToogleCallback(this.isChecked());
            }.bind(this);
            KASClient.UI.addElement(this.checkboxInput, sliderSwitch);
            var sliderRoundDiv = KASClient.UI.getElement("div");
            sliderRoundDiv.className = "slider round";
            KASClient.UI.addElement(sliderRoundDiv, sliderSwitch);
            KASClient.UI.addElement(sliderSwitch, settingView);
            return settingView;
        };
        SurveySliderSwitchSettingView.prototype.isChecked = function () {
            return this.checkboxInput.checked;
        };
        return SurveySliderSwitchSettingView;
    }());
    Survey.SurveySliderSwitchSettingView = SurveySliderSwitchSettingView;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveyUIManager = /** @class */ (function () {
        function SurveyUIManager() {
        }
        SurveyUIManager.getLocalizedString = function (id) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (this.strings[id])
                return (_a = KASClient.App).printf.apply(_a, [this.strings[id]].concat(args));
            return (_b = KASClient.App).printf.apply(_b, [id].concat(args));
            var _a, _b;
        };
        SurveyUIManager.setPageNavigatorAccessibilityHidden = function (hidden) {
            var pageNavigator = document.getElementById("pageNavigator");
            KASClient.UI.setAccessibilityAttribute(pageNavigator, KASClient.UI.KASFormAccessibilityKey.Hidden, hidden);
            KASClient.Internal.screenChanged("");
        };
        SurveyUIManager.getPageNavigator = function () {
            return this.pageNavigator;
        };
        SurveyUIManager.strings = null;
        return SurveyUIManager;
    }());
    Survey.SurveyUIManager = SurveyUIManager;
})(Survey || (Survey = {}));
/// <reference path="./../../../../../../js/declarations/KASClientCore.d.ts" />
/// <reference path="./../../../../../../js/declarations/KASClientUI.d.ts" />
var Survey;
(function (Survey) {
    var SurveyInputFormPage = /** @class */ (function (_super) {
        __extends(SurveyInputFormPage, _super);
        function SurveyInputFormPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SurveyInputFormPage.prototype.init = function (title, rightButtonTitle, doneCallback) {
            this.navigationBar.title = title;
            if (rightButtonTitle != null) {
                var rightActionText = KASClient.UI.getLabel(rightButtonTitle, {
                    "font-weight": "500",
                    "font-size": KASClient.UI.getScaledFontSize("14px"),
                    "color": BLUE_COLOR
                });
                this.navigationBar.rightButtonTitle = rightActionText.outerHTML;
                this.navigationBar.rightButtonAction = function () {
                    if (doneCallback) {
                        doneCallback();
                    }
                }.bind(this);
            }
            this.moduleContainer.backgroundColor = "white";
            this.moduleContainer.addModuleWithFullWidth(this.getInputModule());
            var settings = this.getSettings();
            var fyiAndDepndentContainer = this.getFyiAndDepndentContainer();
            if (fyiAndDepndentContainer) {
                settings.push(fyiAndDepndentContainer);
            }
            if (settings && settings.length > 0) {
                var settingModule = new KASClient.UI.KASFormModule();
                var settingHeader = KASClient.UI.getElement("label", {
                    "color": "#000000",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "font-weight": "500"
                });
                settingHeader.innerText = Survey.SurveyCreation.getLocalizedString("SurveyOptionSettingHeader");
                settingModule.contentView = KASClient.UI.getVerticalDiv([settingHeader].concat(settings), {
                    "margin": "15px",
                    "margin-top": "0"
                });
                this.moduleContainer.addModuleWithFullWidth(settingModule);
            }
        };
        SurveyInputFormPage.prototype.getSettings = function () {
            return [];
        };
        SurveyInputFormPage.prototype.getFyiAndDepndentContainer = function () {
            return null;
        };
        return SurveyInputFormPage;
    }(KASClient.UI.KASFormPage));
    Survey.SurveyInputFormPage = SurveyInputFormPage;
})(Survey || (Survey = {}));
/// <reference path="./SurveyInputFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyCreateDetailsFormPage = /** @class */ (function (_super) {
        __extends(SurveyCreateDetailsFormPage, _super);
        function SurveyCreateDetailsFormPage(title, description, doneCallback, isFirstLaunch) {
            if (isFirstLaunch === void 0) { isFirstLaunch = false; }
            var _this = _super.call(this) || this;
            _this.titleView = null;
            _this.descriptionView = null;
            _this.surveyTitle = "";
            _this.surveyDescription = "";
            _this.currentDailogView = null;
            _this.surveyTitle = title;
            _this.surveyDescription = description;
            var mainText = KASClient.UI.getElement("div", {
                "font-weight": "600",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("20px"),
                "text-overflow": "ellipsis",
                "overflow": "hidden"
            });
            mainText.innerText = Survey.SurveyCreation.getLocalizedString("SurveyDetailsPageTitle");
            _super.prototype.init.call(_this, mainText.outerHTML, isFirstLaunch ? Survey.SurveyCreation.getLocalizedString("Next") : Survey.SurveyCreation.getLocalizedString("Done"), function () {
                if (this.titleView.getInputText() == "") {
                    this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("IncompleteDetailsAlertTitle"), Survey.SurveyCreation.getLocalizedString("IncompleteQuestionDetailsMessage"), Survey.SurveyCreation.getLocalizedString("OK"), function () {
                        this.clearDailogView();
                    }.bind(this), "", null);
                    this.addDailogView();
                    return;
                }
                if (doneCallback) {
                    doneCallback(this.titleView.getInputText(), this.descriptionView.getInputText());
                }
            }.bind(_this));
            _this.navigationBar.backAction = function () {
                if (this.currentDailogView != null) {
                    KASClient.UI.removeElement(this.currentDailogView, document.body);
                    this.clearDailogView();
                    return;
                }
                if (!KASClient.isEmptyString(this.titleView.getInputText()) || !KASClient.isEmptyString(this.descriptionView.getInputText())) {
                    var leaveButton = KASClient.UI.getElement("div", {
                        "color": LIGHT_RED_COLOR
                    });
                    leaveButton.innerText = Survey.SurveyCreation.getLocalizedString("LeaveButton");
                    this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("SurveyDiscardDailogTitle"), Survey.SurveyCreation.getLocalizedString("SurveyDiscardConfirmationDailogMessage"), leaveButton.outerHTML, function () {
                        this.clearDailogView();
                        Survey.SurveyCreation.getPageNavigator().goBack();
                    }.bind(this), Survey.SurveyCreation.getLocalizedString("StayButton"), function () {
                        this.clearDailogView();
                    }.bind(this));
                    this.addDailogView();
                }
                else {
                    Survey.SurveyCreation.getPageNavigator().goBack();
                }
            }.bind(_this);
            return _this;
        }
        SurveyCreateDetailsFormPage.prototype.clearDailogView = function () {
            this.currentDailogView = null;
            Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(false);
        };
        SurveyCreateDetailsFormPage.prototype.addDailogView = function () {
            KASClient.UI.addElement(this.currentDailogView, document.body);
            Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(true);
        };
        SurveyCreateDetailsFormPage.prototype.getInputModule = function () {
            var titleDescriptionInputModule = new KASClient.UI.KASFormModule();
            var titleDescriptionViewAttribute = {
                "display": "flex",
                "margin": "15px",
                "flex-direction": "column",
            };
            var titleDescriptionView = KASClient.UI.getElement("div", titleDescriptionViewAttribute);
            this.titleView = new KASClient.UI.KASTextInputView(Survey.SurveyCreation.getLocalizedString("SurveyDetailsTitleHeader"), this.surveyTitle, Survey.SurveyCreation.getLocalizedString("SurveyDetailsTitlePlaceholder"), 20);
            KASClient.UI.addElement(this.titleView.getView(), titleDescriptionView);
            KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                if (!talkBackEnabled) {
                    setTimeout(function () {
                        this.titleView.setFocus(true);
                    }.bind(this), 100);
                }
            }.bind(this));
            this.descriptionView = new KASClient.UI.KASTextInputView(Survey.SurveyCreation.getLocalizedString("SurveyDetailsDescriptionHeader"), this.surveyDescription, Survey.SurveyCreation.getLocalizedString("SurveyDetailsDescriptionPlaceholder"), 16);
            KASClient.UI.addElement(this.descriptionView.getView(), titleDescriptionView);
            titleDescriptionInputModule.contentView = titleDescriptionView;
            return titleDescriptionInputModule;
        };
        return SurveyCreateDetailsFormPage;
    }(Survey.SurveyInputFormPage));
    Survey.SurveyCreateDetailsFormPage = SurveyCreateDetailsFormPage;
})(Survey || (Survey = {}));
/// <reference path="./SurveyInputFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyCreateQuestionFormPage = /** @class */ (function (_super) {
        __extends(SurveyCreateQuestionFormPage, _super);
        function SurveyCreateQuestionFormPage(type, index, doneCallback, question) {
            var _this = _super.call(this) || this;
            _this.question = null;
            _this.questionConfig = null;
            _this.type = 0;
            _this.index = 0;
            _this.currentDailogView = null;
            _this.questionTitleView = null;
            _this.isOptionalCheckBox = null;
            _this.valifLabel = null;
            _this.type = type;
            _this.index = index;
            _this.question = question;
            _this.questionConfig = _this.getQuestionConfig();
            var isOptional = false;
            if (!KASClient.isEmptyObject(question) && !KASClient.isEmptyObject(question.isResponseOptional) && question.isResponseOptional) {
                isOptional = true;
            }
            _this.isOptionalCheckBox = new KASClient.UI.KASCheckboxView(Survey.SurveyCreation.getLocalizedString("SurveyMakeThisQuestionOptionalText"), isOptional, function (isChecked) {
                if (!KASClient.isEmptyObject(question)) {
                    this.question.isResponseOptional = isChecked;
                }
            }.bind(_this));
            var mainText = KASClient.UI.getElement("div", {
                "font-weight": "600",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("20px"),
                "text-overflow": "ellipsis",
                "overflow": "hidden"
            });
            var questionIconView = KASClient.UI.getElement("img", {
                "width": "16px",
                "height": "16px",
                "margin": "auto",
                "background-color": "transparent",
                "object-fit": "contain"
            });
            questionIconView.src = Survey.SurveyQuestionPickerHelper.getIcon(_this.type);
            mainText.innerHTML = KASClient.UI.getLabel((_this.index + 1).toLocaleString() + ". " + questionIconView.outerHTML + "  " + Survey.SurveyQuestionPickerHelper.getName(_this.type), {}, false).innerHTML;
            KASClient.UI.setAccessibilityBasic(mainText, false, KASClient.UI.KASFormAccessibilityRole.Text, Survey.SurveyQuestionPickerHelper.getName(_this.type));
            _super.prototype.init.call(_this, mainText.outerHTML, Survey.SurveyCreation.getLocalizedString("Done"), function () {
                if (this.getQuestion() == null) {
                    this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("IncompleteDetailsAlertTitle"), Survey.SurveyCreation.getLocalizedString("IncompleteQuestionDetailsMessage"), Survey.SurveyCreation.getLocalizedString("OK"), function () {
                        this.clearDailogView();
                    }.bind(this), Survey.SurveyCreation.getLocalizedString("QuestionDiscardConfirmationDailogDeleteButton"), function () {
                        this.clearDailogView();
                        Survey.SurveyCreation.getPageNavigator().goBack();
                    }.bind(this));
                    this.addDailogView();
                    return;
                }
                if (doneCallback) {
                    var ques = this.question;
                    if (ques && ques.displayType == KASClient.KASQuestionDisplayType.DropDown) {
                        this.checkForDropDownOptionChange(doneCallback);
                    }
                    else {
                        doneCallback(this.getQuestion());
                    }
                }
            }.bind(_this));
            _this.navigationBar.backAction = function () {
                if (this.currentDailogView != null) {
                    KASClient.UI.removeElement(this.currentDailogView, document.body);
                    this.clearDailogView();
                    return;
                }
                var leaveButton = KASClient.UI.getElement("div", {
                    "color": LIGHT_RED_COLOR
                });
                leaveButton.innerText = Survey.SurveyCreation.getLocalizedString("LeaveButton");
                this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("QuestionDiscardConfirmationDailogTitle"), Survey.SurveyCreation.getLocalizedString("QuestionDiscardConfirmationDailogMessage"), leaveButton.outerHTML, function () {
                    this.clearDailogView();
                    Survey.SurveyCreation.getPageNavigator().goBack();
                }.bind(this), Survey.SurveyCreation.getLocalizedString("StayButton"), function () {
                    this.clearDailogView();
                }.bind(this));
                this.addDailogView();
            }.bind(_this);
            return _this;
        }
        SurveyCreateQuestionFormPage.prototype.clearDailogView = function () {
            this.currentDailogView = null;
            Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(false);
        };
        SurveyCreateQuestionFormPage.prototype.addDailogView = function () {
            KASClient.UI.addElement(this.currentDailogView, document.body);
            Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(true);
        };
        SurveyCreateQuestionFormPage.prototype.getInputModule = function () {
            var questionModule = new KASClient.UI.KASFormModule();
            var questionViewAttribute = {
                "display": "flex",
                "margin": "15px",
                "flex-direction": "column",
            };
            var questionView = KASClient.UI.getElement("div", questionViewAttribute);
            this.questionTitleView = new KASClient.UI.KASTextInputView(Survey.SurveyCreation.getLocalizedString("SurveyQuestionHeader"), this.question ? this.question.title : "", Survey.SurveyCreation.getLocalizedString("AddQuestionHere"), 20);
            KASClient.UI.addElement(this.questionTitleView.getView(), questionView);
            KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                if (!talkBackEnabled) {
                    setTimeout(function () {
                        this.questionTitleView.setFocus(true);
                    }.bind(this), 100);
                }
            }.bind(this));
            questionModule.contentView = questionView;
            return questionModule;
        };
        ;
        SurveyCreateQuestionFormPage.prototype.getQuestionConfig = function () {
            if (this.question && this.question.config) {
                return this.question.config;
            }
            return new KASClient.KASQuestionConfig();
        };
        SurveyCreateQuestionFormPage.prototype.getQuestion = function () {
            if (this.questionTitleView.getInputText() == "") {
                return null;
            }
            if (!this.question) {
                this.question = new KASClient.KASQuestion();
            }
            var question = this.question;
            question.title = this.questionTitleView.getInputText();
            if (!KASClient.isEmptyObject(this.isOptionalCheckBox)) {
                question.isResponseOptional = this.isOptionalCheckBox.isChecked();
            }
            switch (this.type) {
                case 1:
                    question.type = KASClient.KASQuestionType.Text;
                    break;
                case 2:
                    question.type = KASClient.KASQuestionType.Numeric;
                    break;
                case 5:
                    question.type = KASClient.KASQuestionType.PhoneNumber;
                    break;
                case 6:
                    question.type = KASClient.KASQuestionType.DateOnly;
                    break;
                default:
                    break;
            }
            question.config = this.questionConfig;
            return question;
        };
        SurveyCreateQuestionFormPage.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            settings.push(this.isOptionalCheckBox.getView()); // for is optional checkbox setting   
            return settings;
        };
        SurveyCreateQuestionFormPage.prototype.getFyiAndDepndentContainer = function () {
            var fyiAndDepndentContainer = KASClient.UI.getDiv({ "opacity": "0.8",
                "border-radius": "2px",
                "background-color": "#e3e7eb" });
            var fyiElement = this.getFyiView();
            if (fyiElement != null) {
                fyiAndDepndentContainer.appendChild(fyiElement);
            }
            var dependentInfo = this.getDependentQuestionInfoView();
            if (dependentInfo != null) {
                fyiAndDepndentContainer.appendChild(dependentInfo);
            }
            if (fyiElement != null || dependentInfo != null) {
                return fyiAndDepndentContainer;
            }
            return null;
        };
        SurveyCreateQuestionFormPage.prototype.getFyiView = function () {
            if (!KASClient.isEmptyObject(this.question) && !KASClient.isEmptyObject(this.question.valif)) {
                var valifMsg = "";
                var attributes = [];
                for (var key in this.question.valif.attributes) {
                    attributes.push(this.question.valif.attributes[key]);
                }
                if (!KASClient.isEmptyObject(this.question.valif.errorString)) {
                    valifMsg = Survey.SurveyCreation.getLocalizedString(this.question.valif.errorString);
                }
                for (var k = 0; k < attributes.length; k++) {
                    valifMsg = valifMsg.replace("{" + k + "}", attributes[k]);
                }
                var fyiDiv = KASClient.UI.getDiv({
                    "height": "40x",
                    "font-size": "11px",
                    "color": "#32485f",
                    "margin-left": "10px",
                    "display": "flex",
                    "flex": "1",
                    "flex-direction": "row",
                    "margin-top": "5px",
                    "margin-bottom": "5px"
                });
                var linkIcon = KASClient.UI.getElement("img", {
                    "width": "11px",
                    "height": "11px",
                    "background-color": "transparent",
                    "margin-top": "2px"
                });
                linkIcon.src = "fyiIcon.png";
                var fyiLabel = KASClient.UI.getLabel(valifMsg, {
                    "height": "40x",
                    "font-size": "11px",
                    "line-height": "1",
                    "color": "#32485f",
                    "margin-left": "5px",
                });
                fyiDiv.appendChild(linkIcon);
                fyiDiv.appendChild(fyiLabel);
                return fyiDiv;
            }
            return null;
        };
        SurveyCreateQuestionFormPage.prototype.getDependentQuestionInfoView = function () {
            if (!KASClient.isEmptyObject(this.question) && !KASClient.isEmptyObject(this.question.visif)) {
                var allQuestions = Survey.SurveyCreation.getQuestions();
                var index = 0;
                for (index; index < allQuestions.length; index++) {
                    if (allQuestions[index].id.toString() == this.question.visif.dependencyQuestionId) {
                        var infoMsg = KASClient.App.printf(Survey.SurveyCreation.getLocalizedString("DependencyQuestionInfoMessage"), (index + 1));
                        var dependentQuesInfoDiv = KASClient.UI.getDiv({
                            "height": "40x",
                            "font-size": "11px",
                            "color": "#32485f",
                            "margin-left": "10px",
                            "display": "flex",
                            "flex": "1",
                            "flex-direction": "row",
                            "margin-bottom": "5px"
                        });
                        var linkIcon = KASClient.UI.getElement("img", {
                            "width": "11px",
                            "height": "11px",
                            "background-color": "transparent",
                        });
                        linkIcon.src = "dependencyIcon.png";
                        var dependentQuesInfoLabel = KASClient.UI.getLabel(infoMsg, {
                            "height": "40x",
                            "font-size": "11px",
                            "line-height": "1",
                            "color": "#32485f",
                            "margin-left": "5px",
                        });
                        dependentQuesInfoDiv.appendChild(linkIcon);
                        dependentQuesInfoDiv.appendChild(dependentQuesInfoLabel);
                        return dependentQuesInfoDiv;
                    }
                }
            }
            return null;
        };
        return SurveyCreateQuestionFormPage;
    }(Survey.SurveyInputFormPage));
    Survey.SurveyCreateQuestionFormPage = SurveyCreateQuestionFormPage;
})(Survey || (Survey = {}));
/// <reference path="./SurveyCreateQuestionFormPage.ts" />
var Survey;
(function (Survey) {
    var AttachmentListResponseType = KASClient.AttachmentListResponseType;
    var SurveyCreateImageQuestionFormPage = /** @class */ (function (_super) {
        __extends(SurveyCreateImageQuestionFormPage, _super);
        function SurveyCreateImageQuestionFormPage(type, index, doneCallback, question) {
            return _super.call(this, type, index, doneCallback, question) || this;
        }
        SurveyCreateImageQuestionFormPage.prototype.getQuestion = function () {
            var question = _super.prototype.getQuestion.call(this);
            if (question == null)
                return null;
            if (this.questionConfig.attachmentListType == AttachmentListResponseType.LIST_OF_IMAGES) {
                this.questionConfig = this.getCorrespondingAttachmentListConfig();
                question.type = KASClient.KASQuestionType.AttachmentList;
            }
            else {
                this.questionConfig = this.getCorrespondingImageConfig();
                question.type = KASClient.KASQuestionType.Image;
            }
            question.config = this.questionConfig;
            return question;
        };
        SurveyCreateImageQuestionFormPage.prototype.getCorrespondingAttachmentListConfig = function () {
            var config = new KASClient.KASAttachmentListQuestionConfig();
            config.attachmentListType = AttachmentListResponseType.LIST_OF_IMAGES;
            config.pageBreakEnabled = this.questionConfig.pageBreakEnabled;
            config.imageSource = this.questionConfig.imageSource;
            return config;
        };
        SurveyCreateImageQuestionFormPage.prototype.getCorrespondingImageConfig = function () {
            var config = new KASClient.KASImageQuestionConfig();
            config.pageBreakEnabled = this.questionConfig.pageBreakEnabled;
            config.imageSource = this.questionConfig.imageSource;
            return config;
        };
        SurveyCreateImageQuestionFormPage.prototype.getSettings = function () {
            var settings = _super.prototype.getSettings.call(this);
            // Add image source setting for image question type
            if (this.type == 3) {
                var isCameraOnly = this.questionConfig.imageSource == KASClient.ImagePickerSource.CameraBack;
                var onlyCamera = new Survey.SurveyCheckboxSettingView(Survey.SurveyCreation.getLocalizedString("SurveyImageQuestionOnlyCamera"), isCameraOnly, function (isChecked) {
                    var source = KASClient.ImagePickerSource.All;
                    if (isChecked) {
                        source = KASClient.ImagePickerSource.CameraBack;
                    }
                    this.questionConfig.imageSource = source;
                }.bind(this));
                settings.push(onlyCamera.getView());
                if (this.question) {
                    if (!this.questionConfig) {
                        this.questionConfig.attachmentListType = KASClient.AttachmentListResponseType.LIST_OF_IMAGES;
                    }
                }
                else {
                    this.questionConfig.attachmentListType = KASClient.AttachmentListResponseType.LIST_OF_IMAGES;
                }
                var restrictToSingleImage = new Survey.SurveyCheckboxSettingView(Survey.SurveyCreation.getLocalizedString("SurveyImageQuestionSingleImages"), this.questionConfig.attachmentListType != KASClient.AttachmentListResponseType.LIST_OF_IMAGES, function (isChecked) {
                    var attachmentListType = KASClient.AttachmentListResponseType.LIST_OF_IMAGES;
                    if (isChecked) {
                        attachmentListType = KASClient.AttachmentListResponseType.GENERIC;
                    }
                    this.questionConfig.attachmentListType = attachmentListType;
                }.bind(this));
                settings.push(restrictToSingleImage.getView());
            }
            return settings;
        };
        return SurveyCreateImageQuestionFormPage;
    }(Survey.SurveyCreateQuestionFormPage));
    Survey.SurveyCreateImageQuestionFormPage = SurveyCreateImageQuestionFormPage;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveyCreateMultipleChoiceOption = /** @class */ (function () {
        function SurveyCreateMultipleChoiceOption(option, index, question) {
            this.option = null;
            this.index = 0;
            this.optionInputTitle = null;
            this.optionRemoveCallback = null;
            this.view = null;
            this.question = null;
            this.option = option;
            this.index = index;
            this.question = question;
        }
        SurveyCreateMultipleChoiceOption.prototype.getView = function () {
            if (this.view != null) {
                return this.view;
            }
            var optionView = KASClient.UI.getElement("div", { "height": "48px", "margin": "0", "margin-bottom": "11px", "display": "flex", "flex-direction": "row" });
            var optionInputViewAttributes = {
                "height": "100%",
                "margin": "0",
                "border-radius": "2px",
                "border": "solid 0.5px #98a3af",
                "display": "flex",
                "flex": "1",
                "flex-direction": "row"
            };
            var optionInputView = KASClient.UI.getElement("div", optionInputViewAttributes);
            KASClient.UI.addElement(optionInputView, optionView);
            var optionInputAttributes = {
                "-webkit-appearance": "none",
                "flex": "1",
                "border": "none",
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": "#32485f",
                "padding-left": "12px"
            };
            this.optionInputTitle = KASClient.UI.getElement("input", optionInputAttributes);
            this.optionInputTitle.type = "text";
            this.optionInputTitle.value = this.option ? this.option.text : "";
            this.optionInputTitle.placeholder = Survey.SurveyCreation.getLocalizedString("SurveyMultpleOptionPlaceholder", (this.index + 1).toLocaleString());
            KASClient.UI.addElement(this.optionInputTitle, optionInputView);
            // this.addImageIcon = KASClient.UI.getElement("img", {"object-fit": "contain", "width": "auto", "padding": "16px", "padding-left": "0px", "padding-right": "0px", "margin": "0"});
            // this.addImageIcon.src = "optionDefaultImage.png";
            // this.addImageIcon.onclick = function(){
            //     KASClient.App.showImagePickerAsync(function(selectedImagePath, error) {
            //         if(error != null){
            //             return;
            //         }
            //         this.src = selectedImagePath;
            //     }.bind(this));
            // };
            // KASClient.UI.addElement(this.addImageIcon, optionInputView);
            var optionRemoveIcon = KASClient.UI.getElement("img", { "object-fit": "contain", "padding": "19px", "padding-right": "0px", "padding-left": "10px", "margin": "0" });
            optionRemoveIcon.src = "cancel.png";
            optionRemoveIcon.setAttribute("name", "optionRemoveHandler");
            optionRemoveIcon.classList.add("hidden_remove_icon");
            optionRemoveIcon.onclick = function () {
                KASClient.App.readTalkBackMessage(Survey.SurveyCreation.getLocalizedString("DeletedOptionTalkback"));
                if (this.optionRemoveCallback) {
                    this.optionRemoveCallback(this.index);
                }
            }.bind(this);
            KASClient.UI.setAccessibilityBasic(optionRemoveIcon, false, KASClient.UI.KASFormAccessibilityRole.Button, Survey.SurveyCreation.getLocalizedString("DeleteOption"));
            KASClient.UI.addElement(optionRemoveIcon, optionView);
            this.view = optionView;
            return this.view;
        };
        ;
        SurveyCreateMultipleChoiceOption.prototype.addOptionRemoveCallback = function (optionRemoveCallback) {
            if (optionRemoveCallback === void 0) { optionRemoveCallback = null; }
            this.optionRemoveCallback = optionRemoveCallback;
        };
        ;
        SurveyCreateMultipleChoiceOption.prototype.setIndex = function (index) {
            this.index = index;
            if (this.optionInputTitle != null) {
                this.optionInputTitle.placeholder = Survey.SurveyCreation.getLocalizedString("SurveyMultpleOptionPlaceholder", (this.index + 1).toLocaleString());
            }
        };
        ;
        SurveyCreateMultipleChoiceOption.prototype.getOption = function () {
            if (this.optionInputTitle.value.trim() == "" || this.optionInputTitle.value == undefined) {
                return null;
            }
            var option = new KASClient.KASQuestionOption();
            option.id = this.index;
            option.text = this.optionInputTitle.value;
            //option.pictureUrl = this.addImageIcon.src;
            return option;
        };
        ;
        return SurveyCreateMultipleChoiceOption;
    }());
    Survey.SurveyCreateMultipleChoiceOption = SurveyCreateMultipleChoiceOption;
})(Survey || (Survey = {}));
/// <reference path="./SurveyCreateQuestionFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyCreateMultipleChoiceQuestionFormPage = /** @class */ (function (_super) {
        __extends(SurveyCreateMultipleChoiceQuestionFormPage, _super);
        function SurveyCreateMultipleChoiceQuestionFormPage(type, index, doneCallback, question) {
            return _super.call(this, type, index, doneCallback, question) || this;
        }
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.initialize = function () {
            var options = this.question ? this.question.options : [];
            this.optionViews = [];
            var optionCount = (options && options.length > 2) ? options.length : 2;
            for (var i = 0; i < optionCount; i++) {
                var option = (options && options.length > i) ? options[i] : null;
                this.optionViews[i] = new Survey.SurveyCreateMultipleChoiceOption(option, i, this.question);
            }
            this.allowMultipleOption = (this.question != null && this.question.type == KASClient.KASQuestionType.MultiSelect) ? true : false;
            ;
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.getInputModule = function () {
            this.initialize();
            var questionModule = _super.prototype.getInputModule.call(this);
            var questionView = questionModule.contentView;
            // Options
            var optionDiv = KASClient.UI.getElement("div", { "display": "flex", "flex-direction": "column" });
            KASClient.UI.addElement(optionDiv, questionView);
            var optionDivHeader = KASClient.UI.getElement("label", {
                "color": "#000000",
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "font-weight": "500"
            });
            optionDivHeader.innerText = Survey.SurveyCreation.getLocalizedString("SurveyOptionAnswerHeader");
            KASClient.UI.addElement(optionDivHeader, optionDiv);
            this.optionListDiv = KASClient.UI.getElement("div", { "margin": "0", "padding-top": "11px" });
            KASClient.UI.addElement(this.optionListDiv, optionDiv);
            this.loadOptionItem();
            // var addOtherOption = new SliderSwitchSettingView("Add ‘Other’ as an answer choice", function() {
            // });
            // KASClient.UI.addElement(addOtherOption.getView(), optionDiv);
            // Settings
            var settingViewDiv = KASClient.UI.getElement("div", { "display": "flex", "flex-direction": "column" });
            KASClient.UI.addElement(settingViewDiv, questionView);
            questionModule.contentView = questionView;
            return questionModule;
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.getSettings = function () {
            var allowMultiple = new Survey.SurveyCheckboxSettingView(Survey.SurveyCreation.getLocalizedString("SurveyAllowMultipleAnswerTitle"), this.allowMultipleOption, function (isChecked) {
                this.allowMultipleOption = isChecked;
            }.bind(this));
            var settings = _super.prototype.getSettings.call(this);
            settings.push(allowMultiple.getView());
            return settings;
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.loadOptionItem = function () {
            KASClient.UI.clearElement(this.optionListDiv);
            for (var i = 0; i < this.optionViews.length; i++) {
                this.optionViews[i].setIndex(i);
                this.optionViews[i].addOptionRemoveCallback(function (index) {
                    this.removeOption(index);
                }.bind(this));
                KASClient.UI.addElement(this.optionViews[i].getView(), this.optionListDiv);
            }
            var addMoreOptionAttributes = {
                "height": "48px",
                "border-radius": "2px",
                "border": "dashed 1px rgba(152, 163, 175, 0.5)",
                "color": TEXT_SECONDARY_COLOR,
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "line-height": "48px",
                "padding-left": "12px",
                "margin-right": "36px",
                "margin-bottom": "11px"
            };
            var addMoreOption = KASClient.UI.getLabel(Survey.SurveyCreation.getLocalizedString("SurveyMultpleOptionAddMoreOption"), addMoreOptionAttributes);
            addMoreOption.onclick = function () {
                this.optionViews[this.optionViews.length] = new Survey.SurveyCreateMultipleChoiceOption(null, this.optionViews.length, this.question);
                KASClient.UI.addElement(this.optionViews[this.optionViews.length - 1].getView(), this.optionListDiv);
                this.optionViews[this.optionViews.length - 1].addOptionRemoveCallback(function (index) {
                    this.removeOption(index);
                }.bind(this));
                var lastNode = this.optionListDiv.lastChild;
                var secondLastNode = this.optionListDiv.lastChild.previousSibling;
                this.optionListDiv.insertBefore(lastNode, secondLastNode);
                if (this.optionViews.length > 2) {
                    this.toggleHideShowRemoveIconClass(true);
                }
                KASClient.App.readTalkBackMessage(Survey.SurveyCreation.getLocalizedString("SurveyAddMoreOptionTalkBack"));
            }.bind(this);
            KASClient.UI.setAccessibilityBasic(addMoreOption, false, KASClient.UI.KASFormAccessibilityRole.Button, Survey.SurveyCreation.getLocalizedString("SurveyMultpleOptionAddMoreOption"));
            KASClient.UI.addElement(addMoreOption, this.optionListDiv);
            // options remove button is accessibility hidden or not is decided here
            // timeout is necessary because getting views attached to dom takes some time.
            setTimeout(function () {
                this.toggleHideShowRemoveIconClass(this.optionViews.length > 2);
            }.bind(this), 300);
        };
        ;
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.removeOption = function (index) {
            if (this.optionViews.length <= 2)
                return;
            var quesList = Survey.SurveyCreation.getQuestions();
            if (!KASClient.isEmptyObject(quesList)) {
                var i = quesList.indexOf(this.question) + 1;
                for (i; i < quesList.length; i++) {
                    if (!KASClient.isEmptyObject(quesList[i].visif) &&
                        !KASClient.isEmptyObject(this.optionViews[index].option) &&
                        quesList[i].visif.dependencyQuestionId == this.question.id.toString() &&
                        quesList[i].visif.optionId == this.optionViews[index].option.id.toString()) {
                        var deleteButton = KASClient.UI.getElement("div", {
                            "color": LIGHT_RED_COLOR
                        });
                        deleteButton.innerText = Survey.SurveyCreation.getLocalizedString("DiscardConfirmationDailogDeleteButton");
                        this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("OptionDeleteConfirmationDailogTitle"), Survey.SurveyCreation.getLocalizedString("DependencyOptionDeleteConfirmationDailogMessage"), deleteButton.outerHTML, function () {
                            this.clearDailogView();
                            this.spliceAndLoadOptionItem(index);
                            Survey.SurveyCreation.removeDependencyFromQuestion(quesList[i].visif.dependencyQuestionId, quesList[i].visif.optionId);
                        }.bind(this), Survey.SurveyCreation.getLocalizedString("QuestionDiscardConfirmationDailogBackButton"), function () {
                            this.clearDailogView();
                        }.bind(this));
                        this.addDailogView();
                        return;
                    }
                }
            }
            this.spliceAndLoadOptionItem(index);
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.spliceAndLoadOptionItem = function (indx) {
            this.optionViews.splice(indx, 1);
            //Adjust option id in dependent questions
            var quesList = Survey.SurveyCreation.getQuestions();
            if (!KASClient.isEmptyObject(quesList)) {
                var i = quesList.indexOf(this.question) + 1;
                for (i; i < quesList.length; i++) {
                    if (!KASClient.isEmptyObject(quesList[i].visif) &&
                        quesList[i].visif.dependencyQuestionId == this.question.id.toString() &&
                        quesList[i].visif.optionId) {
                        if (quesList[i].visif.optionId >= indx) {
                            quesList[i].visif.optionId = ((+quesList[i].visif.optionId) - 1).toString();
                            if (Object.keys(quesList[i].visif.rule)[0] == "==") {
                                quesList[i].visif.rule[Object.keys(quesList[i].visif.rule)[0]][0] = quesList[i].visif.optionId;
                            }
                            else if (Object.keys(quesList[i].visif.rule)[0] == "in") {
                                quesList[i].visif.rule[Object.keys(quesList[i].visif.rule)[0]][0]["toInt"] = quesList[i].visif.optionId;
                            }
                        }
                    }
                }
            }
            if (this.optionViews.length <= 2) {
                this.toggleHideShowRemoveIconClass(false);
            }
            this.loadOptionItem();
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.toggleHideShowRemoveIconClass = function (isHidden) {
            var options = document.getElementsByName("optionRemoveHandler");
            var classToToggle = "hidden_remove_icon";
            for (var i = 0; i < options.length; i++) {
                if (isHidden)
                    options[i].classList.remove(classToToggle);
                else
                    options[i].classList.add(classToToggle);
                KASClient.UI.setAccessibilityBasic(options[i], !isHidden);
            }
        };
        SurveyCreateMultipleChoiceQuestionFormPage.prototype.getQuestion = function () {
            var question = _super.prototype.getQuestion.call(this);
            if (question == null) {
                return null;
            }
            question.type = this.allowMultipleOption ? KASClient.KASQuestionType.MultiSelect : KASClient.KASQuestionType.SingleSelect;
            question.displayType = KASClient.KASQuestionDisplayType.RadioButton;
            for (var i = 0; i < this.optionViews.length; i++) {
                var option = this.optionViews[i].getOption();
                if (option == null)
                    return null;
                question.options[i] = option;
            }
            question.options = question.options.splice(0, this.optionViews.length);
            return question;
        };
        return SurveyCreateMultipleChoiceQuestionFormPage;
    }(Survey.SurveyCreateQuestionFormPage));
    Survey.SurveyCreateMultipleChoiceQuestionFormPage = SurveyCreateMultipleChoiceQuestionFormPage;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveyCreateQuestionPicker = /** @class */ (function () {
        function SurveyCreateQuestionPicker(selectionCallback, cancelCallback) {
            this.selectionCallback = null;
            this.cancelCallback = null;
            this.SNACKBAR_ANIMATION_TIME = 0.2;
            this.pickerViewCloseAttributes = {
                "-webkit-animation": "snackbar-close " + this.SNACKBAR_ANIMATION_TIME + "s 1 ease-out forwards",
                "animation": "snackbar-close " + this.SNACKBAR_ANIMATION_TIME + "s 1 ease-out forwards"
            };
            this.pickerViewShowAttributes = {
                "-webkit-animation": "snackbar " + this.SNACKBAR_ANIMATION_TIME + "s 1 ease-out",
                "animation": "snackbar " + this.SNACKBAR_ANIMATION_TIME + "s 1 ease-out"
            };
            this.pickerView = {
                "bottom": "0%",
                "width": "100%",
                "position": "fixed",
                "background-color": "white",
                "border-top-right-radius": "10px",
                "border-top-left-radius": "10px",
                "overflow": "hidden",
                "will-change": "transform, top"
            };
            this.containerDiv = null;
            this.mainDiv = null;
            this.isShowing = null;
            this.selectionCallback = selectionCallback;
            this.cancelCallback = cancelCallback;
        }
        SurveyCreateQuestionPicker.prototype.getView = function () {
            if (this.mainDiv != null) {
                return this.mainDiv;
            }
            var pickerAttributes = {
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "z-index": "10",
                "background-color": "rgba(50, 72, 95, 0.5)"
            };
            this.mainDiv = KASClient.UI.getElement("div", pickerAttributes);
            var isAndroidTalkBackEnabled = false;
            if (KASClient.getPlatform() == KASClient.Platform.Android) {
                KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                    if (talkBackEnabled) {
                        isAndroidTalkBackEnabled = true;
                    }
                });
            }
            if (!isAndroidTalkBackEnabled) {
                this.mainDiv.onclick = function () {
                    this.closePicker(null);
                }.bind(this);
            }
            var pickerViewAttributes = {
                "bottom": "0%",
                "width": "100%",
                "position": "fixed",
                "background-color": "white",
                "border-top-right-radius": "10px",
                "border-top-left-radius": "10px",
                "overflow": "hidden",
                "will-change": "transform, top",
                "box-shadow": "0px -2px 4px 1px rgba(0, 0, 0, 0.26)"
            };
            this.containerDiv = KASClient.UI.getElement("div", pickerViewAttributes);
            if (!isAndroidTalkBackEnabled) {
                this.containerDiv.onclick = function () {
                    event.stopPropagation();
                };
            }
            KASClient.UI.addElement(this.containerDiv, this.mainDiv);
            var pickerHeaderAttributes = {
                "padding-top": "12px",
                "padding-bottom": "12px",
                "padding-left": "14px",
                "padding-right": "14px",
                "background-color": "rgba(152, 163, 175, 0.08)",
                "display": "flex",
                "justify-content": "space-between"
            };
            var pickerHeader = KASClient.UI.getElement("div", pickerHeaderAttributes);
            KASClient.UI.addElement(pickerHeader, this.containerDiv);
            var headerLabel = KASClient.UI.getElement("label", {
                "color": TEXT_SECONDARY_COLOR,
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "font-weight": "500"
            });
            headerLabel.innerHTML = Survey.SurveyCreation.getLocalizedString("SurveyQuestionPickerHeader");
            KASClient.UI.addElement(headerLabel, pickerHeader);
            var closePickerButton = KASClient.UI.getImage("cancel.png", { "height": "15px", "width": "15px" });
            closePickerButton.onclick = function () {
                this.closePicker(null);
            }.bind(this);
            KASClient.UI.setAccessibilityBasic(closePickerButton, false, KASClient.UI.KASFormAccessibilityRole.Button, Survey.SurveyCreation.getLocalizedString("SurveyQuestionPickerCloseButtonTitle"));
            KASClient.UI.addElement(closePickerButton, pickerHeader);
            KASClient.UI.addElement(this.getQuestionTypeView(function (selectedQuestion) {
                this.closePicker(function () {
                    if (this.selectionCallback) {
                        this.selectionCallback(selectedQuestion);
                    }
                }.bind(this));
                event.stopPropagation();
            }.bind(this)), this.containerDiv);
            return this.mainDiv;
        };
        SurveyCreateQuestionPicker.prototype.showPicker = function () {
            KASClient.UI.addElement(this.getView(), document.body);
            Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(true);
            this.isShowing = true;
            if (KASClient.getPlatform() == KASClient.Platform.Android) {
                KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                    if (!talkBackEnabled) {
                        KASClient.UI.addCSS(this.containerDiv, this.pickerViewShowAttributes);
                    }
                    else {
                        KASClient.UI.addCSS(this.containerDiv, {
                            "-webkit-animation": "none",
                            "animation": "none"
                        });
                    }
                }.bind(this));
            }
            else {
                KASClient.UI.addCSS(this.containerDiv, this.pickerViewShowAttributes);
            }
        };
        SurveyCreateQuestionPicker.prototype.closePicker = function (callback) {
            if (!this.isShowing)
                return;
            KASClient.UI.addCSS(this.containerDiv, this.pickerViewCloseAttributes);
            setTimeout(function () {
                Survey.SurveyCreation.setPageNavigatorAccessibilityHidden(false);
                KASClient.UI.removeElement(this.mainDiv, document.body);
                this.isShowing = false;
                if (callback) {
                    callback();
                }
            }.bind(this), this.SNACKBAR_ANIMATION_TIME * 1000);
        };
        SurveyCreateQuestionPicker.prototype.isDailogShowing = function () {
            return this.isShowing;
        };
        SurveyCreateQuestionPicker.prototype.getQuestionTypeView = function (selectionCallback) {
            var questionType = Survey.SurveyQuestionPickerHelper.getAllQuestionType();
            var questionTypeViewAttributes = {
                "width": "100%",
                "padding-top": "10px",
                "padding-bottom": "10px"
            };
            var questionTypeView = KASClient.UI.getElement("div", questionTypeViewAttributes);
            questionTypeView.onclick = function () {
                event.stopPropagation();
            };
            var ROW_ITEM_COUNT = 4;
            var columnCount = questionType.length / ROW_ITEM_COUNT;
            for (var i = 0; i < columnCount; i++) {
                var rowAttributes = {
                    "width": "100%",
                    "display": "flex",
                    "flex": "1",
                    "flex-direction": "row",
                    "justify-content": "space-around",
                    "padding-top": "10px",
                    "padding-bottom": "10px"
                };
                var rowView = KASClient.UI.getElement("div", rowAttributes);
                KASClient.UI.addElement(rowView, questionTypeView);
                for (var j = 0; j < ROW_ITEM_COUNT; j++) {
                    var questionTypeForPicker = null;
                    if (ROW_ITEM_COUNT * i + j < questionType.length) {
                        questionTypeForPicker = questionType[ROW_ITEM_COUNT * i + j];
                    }
                    var itemAttributes = {
                        "width": "58px",
                        "text-align": "center",
                    };
                    var itemView = KASClient.UI.getElement("div", itemAttributes);
                    var itemViewType = [questionTypeForPicker ? questionTypeForPicker.type : -1];
                    itemView.onclick = function (type) {
                        if (selectionCallback && type != -1) {
                            selectionCallback(type);
                        }
                    }.bind(itemView, itemViewType);
                    KASClient.UI.addElement(itemView, rowView);
                    if (questionTypeForPicker == null)
                        continue;
                    KASClient.UI.setAccessibilityBasic(itemView, false, KASClient.UI.KASFormAccessibilityRole.Button, Survey.SurveyQuestionPickerHelper.getName(questionTypeForPicker.type));
                    var itemIconViewAttributes = {
                        "width": "44px",
                        "height": "44px",
                        "border-radius": "22px",
                        "margin-bottom": "8px",
                        "background-color": "transparent",
                        "object-fit": "contain"
                    };
                    var itemIconView = KASClient.UI.getElement("img", itemIconViewAttributes);
                    itemIconView.src = questionTypeForPicker["src"];
                    KASClient.UI.setAccessibilityBasic(itemIconView, true);
                    KASClient.UI.addElement(itemIconView, itemView);
                    var itemLabel = KASClient.UI.getLabel(Survey.SurveyQuestionPickerHelper.getName(questionTypeForPicker.type), {
                        "width": "100%",
                        "color": "#32485f",
                        "font-size": KASClient.UI.getScaledFontSize("12px")
                    });
                    KASClient.UI.setAccessibilityBasic(itemLabel, true);
                    KASClient.UI.addElement(itemLabel, itemView);
                }
            }
            return questionTypeView;
        };
        return SurveyCreateQuestionPicker;
    }());
    Survey.SurveyCreateQuestionPicker = SurveyCreateQuestionPicker;
})(Survey || (Survey = {}));
/// <reference path="./SurveyInputFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyCreateSendReminderScopePage = /** @class */ (function (_super) {
        __extends(SurveyCreateSendReminderScopePage, _super);
        function SurveyCreateSendReminderScopePage(allowSendReminderTo, doneCallback) {
            if (allowSendReminderTo === void 0) { allowSendReminderTo = null; }
            var _this = _super.call(this) || this;
            _this.allowSendReminderTo = KASClient.KASFormResultVisibility.All;
            _this.doneCallback = null;
            _this.allowSendReminderTo = allowSendReminderTo;
            _this.doneCallback = doneCallback;
            var mainText = KASClient.UI.getElement("div", {
                "font-weight": "600",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("20px"),
                "text-overflow": "ellipsis",
                "overflow": "hidden"
            });
            mainText.innerText = Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderHeader");
            _super.prototype.init.call(_this, mainText.outerHTML, null, null);
            _this.moduleContainer.backgroundColor = "rgba(50, 72, 95, 0.07)";
            return _this;
        }
        SurveyCreateSendReminderScopePage.prototype.getInputModule = function () {
            var allowSendReminderToModule = new KASClient.UI.KASFormTitleSubtitleActionModule();
            allowSendReminderToModule.titles = [Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderOnlyMe"), Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderAdmin"), Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderEveryOne")];
            allowSendReminderToModule.boldTitle = false;
            allowSendReminderToModule.showChevron = false;
            var meButton = KASClient.UI.getElement("input");
            meButton.type = "radio";
            meButton.name = "visibility";
            meButton.checked = (this.allowSendReminderTo == KASClient.KASFormResultVisibility.Sender);
            allowSendReminderToModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            allowSendReminderToModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            allowSendReminderToModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Checked, "" + meButton.checked);
            allowSendReminderToModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderOnlyMe"));
            var adminButton = KASClient.UI.getElement("input");
            adminButton.type = "radio";
            adminButton.name = "visibility";
            adminButton.checked = (this.allowSendReminderTo == KASClient.KASFormResultVisibility.Admin);
            allowSendReminderToModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            allowSendReminderToModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            allowSendReminderToModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Checked, "" + adminButton.checked);
            allowSendReminderToModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderAdmin"));
            var everyoneButton = KASClient.UI.getElement("input");
            everyoneButton.type = "radio";
            everyoneButton.name = "visibility";
            everyoneButton.checked = (this.allowSendReminderTo == KASClient.KASFormResultVisibility.All);
            allowSendReminderToModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            allowSendReminderToModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            allowSendReminderToModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Checked, "" + everyoneButton.checked);
            allowSendReminderToModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurveyAllowSendReminderEveryOne"));
            allowSendReminderToModule.rowActions = [function () {
                    this.allowSendReminderTo = KASClient.KASFormResultVisibility.Sender;
                    meButton.checked = (this.allowSendReminderTo == KASClient.KASFormResultVisibility.Sender);
                    this.doneCallback(this.allowSendReminderTo);
                }.bind(this), function () {
                    this.allowSendReminderTo = KASClient.KASFormResultVisibility.Admin;
                    adminButton.checked = (this.visibility == KASClient.KASFormResultVisibility.Admin);
                    this.doneCallback(this.allowSendReminderTo);
                }.bind(this), function () {
                    this.allowSendReminderTo = KASClient.KASFormResultVisibility.All;
                    everyoneButton.checked = (this.allowSendReminderTo == KASClient.KASFormResultVisibility.All);
                    this.doneCallback(this.allowSendReminderTo);
                }.bind(this)];
            allowSendReminderToModule.accessoryViews = [meButton, adminButton, everyoneButton];
            return allowSendReminderToModule;
        };
        return SurveyCreateSendReminderScopePage;
    }(Survey.SurveyInputFormPage));
    Survey.SurveyCreateSendReminderScopePage = SurveyCreateSendReminderScopePage;
})(Survey || (Survey = {}));
/// <reference path="./SurveyInputFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyCreateVisibilityPage = /** @class */ (function (_super) {
        __extends(SurveyCreateVisibilityPage, _super);
        function SurveyCreateVisibilityPage(visibility, doneCallback) {
            if (visibility === void 0) { visibility = null; }
            var _this = _super.call(this) || this;
            _this.visibility = KASClient.KASFormResultVisibility.All;
            _this.doneCallback = null;
            _this.visibility = visibility;
            _this.doneCallback = doneCallback;
            var mainText = KASClient.UI.getElement("div", {
                "font-weight": "600",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("20px"),
                "text-overflow": "ellipsis",
                "overflow": "hidden"
            });
            mainText.innerText = Survey.SurveyCreation.getLocalizedString("SurveyVisibilityHeader");
            _super.prototype.init.call(_this, mainText.outerHTML, null, null);
            _this.moduleContainer.backgroundColor = "rgba(50, 72, 95, 0.07)";
            return _this;
        }
        SurveyCreateVisibilityPage.prototype.getInputModule = function () {
            var visibilityModule = new KASClient.UI.KASFormTitleSubtitleActionModule();
            visibilityModule.titles = [Survey.SurveyCreation.getLocalizedString("SurveyVisibilityEveryOne"), Survey.SurveyCreation.getLocalizedString("SurveyVisibilityAdmin"), Survey.SurveyCreation.getLocalizedString("SurverVisibilityOnlyMe")];
            visibilityModule.boldTitle = false;
            visibilityModule.showChevron = false;
            var everyoneButton = KASClient.UI.getElement("input");
            everyoneButton.type = "radio";
            everyoneButton.name = "visibility";
            everyoneButton.checked = (this.visibility == KASClient.KASFormResultVisibility.All);
            visibilityModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            visibilityModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            visibilityModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Checked, "" + everyoneButton.checked);
            visibilityModule.setAccessibilityAttribute(0, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurveyVisibilityEveryOne"));
            var adminButton = KASClient.UI.getElement("input");
            adminButton.type = "radio";
            adminButton.name = "visibility";
            adminButton.checked = (this.visibility == KASClient.KASFormResultVisibility.Admin);
            visibilityModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            visibilityModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            visibilityModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Checked, "" + adminButton.checked);
            visibilityModule.setAccessibilityAttribute(1, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurveyVisibilityAdmin"));
            var meButton = KASClient.UI.getElement("input");
            meButton.type = "radio";
            meButton.name = "visibility";
            meButton.checked = (this.visibility == KASClient.KASFormResultVisibility.Sender);
            visibilityModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Hidden, "" + false);
            visibilityModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Role, KASClient.UI.KASFormAccessibilityRole.Radio);
            visibilityModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Checked, "" + meButton.checked);
            visibilityModule.setAccessibilityAttribute(2, KASClient.UI.KASFormAccessibilityKey.Label, Survey.SurveyCreation.getLocalizedString("SurverVisibilityOnlyMe"));
            visibilityModule.rowActions = [function () {
                    this.visibility = KASClient.KASFormResultVisibility.All;
                    everyoneButton.checked = (this.visibility == KASClient.KASFormResultVisibility.All);
                    this.doneCallback(this.visibility);
                }.bind(this), function () {
                    this.visibility = KASClient.KASFormResultVisibility.Admin;
                    adminButton.checked = (this.visibility == KASClient.KASFormResultVisibility.Admin);
                    this.doneCallback(this.visibility);
                }.bind(this), function () {
                    this.visibility = KASClient.KASFormResultVisibility.Sender;
                    meButton.checked = (this.visibility == KASClient.KASFormResultVisibility.Sender);
                    this.doneCallback(this.visibility);
                }.bind(this)];
            visibilityModule.accessoryViews = [everyoneButton, adminButton, meButton];
            return visibilityModule;
        };
        return SurveyCreateVisibilityPage;
    }(Survey.SurveyInputFormPage));
    Survey.SurveyCreateVisibilityPage = SurveyCreateVisibilityPage;
})(Survey || (Survey = {}));
/// <reference path="./../SurveyUIManager.ts" />
var Survey;
(function (Survey) {
    var SurveyCreation = /** @class */ (function (_super) {
        __extends(SurveyCreation, _super);
        function SurveyCreation() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SurveyCreation.getPageNavigator = function () {
            return _pageNavigator;
        };
        SurveyCreation.getQuestions = function () {
            return _questions;
        };
        SurveyCreation.removeDependencyFromQuestion = function (quesId, optionId) {
            var allQues = SurveyCreation.getQuestions();
            for (var i = 0; i < allQues.length; i++) {
                if (allQues[i].visif && allQues[i].visif.dependencyQuestionId == quesId) {
                    if (!optionId) {
                        allQues[i].visif = undefined;
                    }
                    else if (allQues[i].visif.optionId && allQues[i].visif.optionId == optionId) {
                        allQues[i].visif = undefined;
                    }
                }
                else if (!optionId && allQues[i].visif && allQues[i].visif.dependencyQuestionId && (+allQues[i].visif.dependencyQuestionId) > quesId) {
                    allQues[i].visif.dependencyQuestionId = ((+allQues[i].visif.dependencyQuestionId) - 1).toString();
                    allQues[i].visif.rule[Object.keys(allQues[i].visif.rule)[0]][1]["var"] = "question." + allQues[i].visif.dependencyQuestionId;
                }
                if (!optionId && (+allQues[i].id) > quesId) {
                    allQues[i].id = allQues[i].id - 1;
                }
            }
        };
        return SurveyCreation;
    }(Survey.SurveyUIManager));
    Survey.SurveyCreation = SurveyCreation;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveyDropDownQuestionPage = /** @class */ (function (_super) {
        __extends(SurveyDropDownQuestionPage, _super);
        function SurveyDropDownQuestionPage(type, index, doneCallback, question) {
            var _this = _super.call(this, type, index, doneCallback, question) || this;
            _this.callback = null;
            _this.isOptional = false;
            return _this;
        }
        SurveyDropDownQuestionPage.prototype.initDropDownOptions = function () {
            this.optionsView = new KASClient.UI.KASDropDownOptionsInputView(Survey.SurveyCreation.getLocalizedString("SurveyDropDownAnswersPlaceHolderText"));
            if (this.question != null && this.question != undefined)
                this.optionsView.options = this.question.options;
        };
        SurveyDropDownQuestionPage.prototype.getInputModule = function () {
            this.initDropDownOptions();
            var questionModule = _super.prototype.getInputModule.call(this);
            // root view
            var questionView = questionModule.contentView;
            // Options
            var optionsDiv = KASClient.UI.getElement("div", { "display": "flex", "flex-direction": "column" });
            var optionsDivHeader = KASClient.UI.getLabel(Survey.SurveyCreation.getLocalizedString("AnswerChoicesText"), {
                "color": "#000000",
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "font-weight": "500",
                "display": "flex",
                "margin-bottom": "16px"
            });
            var optionsViewDiv = KASClient.UI.getDiv({
                "margin": "0",
                "padding-top": "1px",
                "min-height": "150px",
                "border": "1px solid #98a3af",
                "display": "flex",
                "padding-left": "12px",
                "padding-right": "12px"
            });
            KASClient.UI.addElement(this.optionsView.getView(), optionsViewDiv);
            KASClient.UI.addElement(optionsDivHeader, optionsDiv);
            KASClient.UI.addElement(optionsViewDiv, optionsDiv);
            KASClient.UI.addElement(optionsDiv, questionView);
            questionModule.contentView = questionView;
            return questionModule;
        };
        SurveyDropDownQuestionPage.prototype.getQuestion = function () {
            var question = _super.prototype.getQuestion.call(this);
            if (question == null)
                return null;
            var options = this.optionsView.getOptions();
            if (options == null || options.length == 0)
                return null;
            question.type = KASClient.KASQuestionType.SingleSelect;
            question.displayType = KASClient.KASQuestionDisplayType.DropDown;
            //question.options = options;
            return question;
        };
        SurveyDropDownQuestionPage.prototype.checkForDropDownOptionChange = function (doneCallback) {
            var ques = this.question;
            var allQues = Survey.SurveyCreation.getQuestions();
            var i = allQues.indexOf(ques);
            var oldOptions = this.question.options;
            var newOptions = this.optionsView.getOptions();
            var flag = true;
            var dependencyOptionIdTobeChanged = {};
            var quesIndexFromWhichDependencyTobeDeleted = [];
            for (i = i + 1; i < allQues.length; i++) {
                if (allQues[i].visif && allQues[i].visif.dependencyQuestionId == ques.id.toString()) {
                    //found a depndency question for current question
                    var dependentOptionOldId = allQues[i].visif.optionId;
                    var dependentOptionText = "";
                    for (var counter = 0; counter < oldOptions.length; counter++) {
                        if (oldOptions[counter].id.toString() == dependentOptionOldId) {
                            dependentOptionText = oldOptions[counter].text;
                            break;
                        }
                    }
                    var newOptionIndex = 0;
                    for (newOptionIndex = 0; newOptionIndex < newOptions.length; newOptionIndex++) {
                        if (newOptions[newOptionIndex].text == dependentOptionText) {
                            break;
                        }
                    }
                    if (newOptionIndex < newOptions.length) {
                        dependencyOptionIdTobeChanged[i] = newOptions[newOptionIndex].id.toString();
                    }
                    else {
                        quesIndexFromWhichDependencyTobeDeleted.push(i);
                        flag = false;
                    }
                }
            }
            if (flag) {
                this.changeDependencyOptionAndCallDoneback(quesIndexFromWhichDependencyTobeDeleted, dependencyOptionIdTobeChanged, doneCallback);
            }
            else {
                this.optionsView.options = oldOptions;
                var confirmButton = KASClient.UI.getElement("div", {
                    "color": LIGHT_RED_COLOR
                });
                confirmButton.innerText = Survey.SurveyCreation.getLocalizedString("ConfirmButton");
                this.currentDailogView = KASClient.UI.getAlertDailog(Survey.SurveyCreation.getLocalizedString("DropDownOptionDeleteConfirmationDailogTitle"), Survey.SurveyCreation.getLocalizedString("DependencyDropDownOptDeleteConfirmationDialogMessage"), confirmButton.outerHTML, function () {
                    this.clearDailogView();
                    this.changeDependencyOptionAndCallDoneback(quesIndexFromWhichDependencyTobeDeleted, dependencyOptionIdTobeChanged, doneCallback);
                }.bind(this), Survey.SurveyCreation.getLocalizedString("QuestionDiscardConfirmationDailogBackButton"), function () {
                    this.clearDailogView();
                }.bind(this));
                this.addDailogView();
            }
        };
        SurveyDropDownQuestionPage.prototype.changeDependencyOptionAndCallDoneback = function (quesIndexFromWhichDependencyTobeDeleted, dependencyOptionIdTobeChanged, callback) {
            var allQues = Survey.SurveyCreation.getQuestions();
            for (var indexKey in dependencyOptionIdTobeChanged) {
                allQues[indexKey].visif.optionId = dependencyOptionIdTobeChanged[indexKey];
                if (Object.keys(allQues[indexKey].visif.rule)[0] == "==") {
                    allQues[indexKey].visif.rule[Object.keys(allQues[indexKey].visif.rule)[0]][0] = allQues[indexKey].visif.optionId;
                }
            }
            for (var counter = 0; counter < quesIndexFromWhichDependencyTobeDeleted; counter++) {
                allQues[quesIndexFromWhichDependencyTobeDeleted[counter]].visif = undefined;
            }
            var tmpQues = this.getQuestion();
            tmpQues.options = this.optionsView.getOptions();
            callback(tmpQues);
        };
        return SurveyDropDownQuestionPage;
    }(Survey.SurveyCreateQuestionFormPage));
    Survey.SurveyDropDownQuestionPage = SurveyDropDownQuestionPage;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var AttachmentListResponseType = KASClient.AttachmentListResponseType;
    var SurveyQuestionPickerHelper = /** @class */ (function () {
        function SurveyQuestionPickerHelper() {
        }
        SurveyQuestionPickerHelper.kasTypeToPickerType = function (type, displayType, config) {
            var pickerType;
            switch (type) {
                case 0:
                    switch (displayType) {
                        case 0:
                            pickerType = 4;
                            break;
                        default:
                            pickerType = 0;
                            break;
                    }
                    break;
                case 1:
                    pickerType = 0;
                    break;
                case 2:
                    pickerType = 1;
                    break;
                case 3:
                    pickerType = 2;
                    break;
                case 6:
                    pickerType = 3;
                    break;
                case 8:
                    if (config.attachmentListType == AttachmentListResponseType.LIST_OF_IMAGES) {
                        pickerType = 3;
                    }
                    else {
                        pickerType = 0;
                    }
                    break;
                case 9:
                    pickerType = 5;
                    break;
                case 10:
                    pickerType = 6;
                    break;
                default:
                    pickerType = 0;
                    break;
            }
            return pickerType;
        };
        SurveyQuestionPickerHelper.getName = function (type) {
            if (type === void 0) { type = -1; }
            if (type < -1)
                return "";
            for (var i = 0; i < this.questionTypeForPicker.length; i++) {
                if (this.questionTypeForPicker[i]["type"] == type) {
                    return Survey.SurveyCreation.getLocalizedString(this.questionTypeForPicker[i]["name"]);
                }
            }
            return null;
        };
        SurveyQuestionPickerHelper.getIcon = function (type) {
            if (type === void 0) { type = -1; }
            if (type < 0)
                return "";
            for (var i = 0; i < this.questionTypeForPicker.length; i++) {
                if (this.questionTypeForPicker[i]["type"] == type) {
                    return this.questionTypeForPicker[i]["src"];
                }
            }
            return null;
        };
        SurveyQuestionPickerHelper.getPickerQuestionType = function (question) {
            return this.kasTypeToPickerType(question.type, question.displayType, question.config);
        };
        SurveyQuestionPickerHelper.getPickerQuestionDisplayType = function (kasTypeQuestionDisplayType) {
            if (kasTypeQuestionDisplayType === void 0) { kasTypeQuestionDisplayType = KASClient.KASQuestionDisplayType.None; }
            return kasTypeQuestionDisplayType;
        };
        SurveyQuestionPickerHelper.getAllQuestionType = function () {
            return this.questionTypeForPicker;
        };
        SurveyQuestionPickerHelper.getQuestionFormPage = function (type, index, questionDoneCallback) {
            if (type === void 0) { type = 0; }
            if (index === void 0) { index = 0; }
            var questionViewModule;
            switch (type) {
                case 0:
                    questionViewModule = new Survey.SurveyCreateMultipleChoiceQuestionFormPage(type, index, questionDoneCallback, Survey.SurveyCreation.getQuestions()[index]);
                    break;
                case 4:
                    questionViewModule = new Survey.SurveyDropDownQuestionPage(type, index, questionDoneCallback, Survey.SurveyCreation.getQuestions()[index]);
                    break;
                case 3:
                    questionViewModule = new Survey.SurveyCreateImageQuestionFormPage(type, index, questionDoneCallback, Survey.SurveyCreation.getQuestions()[index]);
                    break;
                default:
                    questionViewModule = new Survey.SurveyCreateQuestionFormPage(type, index, questionDoneCallback, Survey.SurveyCreation.getQuestions()[index]);
                    break;
            }
            return questionViewModule;
        };
        SurveyQuestionPickerHelper.questionTypeForPicker = [
            {
                "type": 0,
                "name": "Multiple Choice",
                "background-color": "#a0df89",
                "src": "multipleChoiceIcon.png"
            },
            {
                "type": 4,
                "name": "Drop Down",
                "background-color": "#f788e1",
                "src": "dropDownIcon.png"
            },
            {
                "type": 1,
                "name": "Text Response",
                "background-color": "#bf93ec",
                "src": "textResponseIcon.png"
            },
            {
                "type": 3,
                "name": "Image Upload",
                "background-color": "#50d789",
                "src": "imageResponseIcon.png"
            },
            {
                "type": 2,
                "name": "Numeric Response",
                "background-color": "#f788e1",
                "src": "numberResponseIcon.png"
            },
            {
                "type": 5,
                "name": "Phone Number",
                "background-color": "#f788e1",
                "src": "phoneNumberIcon.png"
            },
            {
                "type": 6,
                "name": "Date",
                "background-color": "#f788e1",
                "src": "dateIcon.png"
            }
        ];
        return SurveyQuestionPickerHelper;
    }());
    Survey.SurveyQuestionPickerHelper = SurveyQuestionPickerHelper;
})(Survey || (Survey = {}));
/// <reference path="./../../../../../../js/declarations/KASClientCore.d.ts" />
/// <reference path="./../../../../../../js/declarations/KASClientUI.d.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseFormPage = /** @class */ (function (_super) {
        __extends(SurveyResponseFormPage, _super);
        function SurveyResponseFormPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return SurveyResponseFormPage;
    }(KASClient.UI.KASFormPage));
    Survey.SurveyResponseFormPage = SurveyResponseFormPage;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyPreviewFormPage = /** @class */ (function (_super) {
        __extends(SurveyPreviewFormPage, _super);
        function SurveyPreviewFormPage() {
            var _this = _super.call(this) || this;
            _this.currentDailogView = null;
            var bottomBarHeight = "150px";
            _this.navigationBar.title = Survey.SurveyResponse.getSurveyResponseHeader();
            if (Survey.SurveyResponse.getSurveyCoverImage() != null) {
                // Adjusting Navigator Bar
                var navigationBarAttribute = {
                    "box-shadow": "none",
                    "background-color": "transparent",
                    "background": "-webkit-linear-gradient(rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 100%)"
                };
                // Module Container
                KASClient.UI.addCSS(_this.moduleContainer.getView(), {
                    "margin-top": "-4pt",
                    "background-color": "white"
                });
                _this.navigationBar.attributes = navigationBarAttribute;
                var mainText = KASClient.UI.getElement("div", {
                    "color": TEXT_PRIMARY_COLOR,
                    "font-weight": "500",
                    "font-size": KASClient.UI.getScaledFontSize("20px")
                });
                mainText.innerText = _this.navigationBar.title;
                _this.navigationBar.title = mainText.outerHTML;
            }
            _this.navigationBar.backAction = function () {
                Survey.SurveyResponse.closeSurveyResponse();
            };
            // Footer View
            _this.bottomBar.attributes = {
                "height": bottomBarHeight,
                "align-items": "flex-end",
                "box-shadow": "none",
                "background-color": "transparent",
                "background": "-webkit-linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 15%, rgba(255,255,255,1) 100%)"
            };
            _this.moduleContainer.backgroundColor = "white";
            // Module Container
            KASClient.UI.addCSS(_this.moduleContainer.getView(), {
                "margin-bottom": bottomBarHeight
            });
            if (Survey.SurveyResponse.getSurveyCoverImage() != null) {
                // Cover Image
                _this.moduleContainer.addModuleWithFullWidth(_this.getCoverImageModule());
            }
            // Title Description Image
            _this.moduleContainer.addModuleWithFullWidth(_this.getTitleDescriptionModule());
            _this.bottomBar.elements = [_this.getBottomBar()];
            return _this;
        }
        SurveyPreviewFormPage.prototype.getCoverImageModule = function () {
            var coverImageModule = new KASClient.UI.KASFormModule();
            var coverImageView = KASClient.UI.getElement("div", {
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "160px"
            });
            var imgAttributes = {
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "object-fit": "cover"
            };
            var coverImage = KASClient.UI.getElement("img", imgAttributes);
            coverImage.src = Survey.SurveyResponse.getSurveyCoverImage();
            coverImage.onclick = function () {
                KASClient.App.showImageImmersiveView([Survey.SurveyResponse.getSurveyCoverImage()]);
            };
            KASClient.UI.setAccessibilityBasic(coverImage, false, KASClient.UI.KASFormAccessibilityRole.Image, Survey.SurveyResponse.getLocalizedString("CoverImage"));
            KASClient.UI.addElement(coverImage, coverImageView);
            var gradientAttribute = {
                "height": "8px",
                "bottom": "0%",
                "width": "100%",
                "position": "absolute",
                "background-color": "rgba(255,255,255,0)",
                "background": "-webkit-linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1.0))"
            };
            var gradientDiv = KASClient.UI.getElement("div", gradientAttribute);
            KASClient.UI.addElement(gradientDiv, coverImageView);
            coverImageModule.contentView = coverImageView;
            return coverImageModule;
        };
        SurveyPreviewFormPage.prototype.getTitleDescriptionModule = function () {
            var titleDescriptionModule = new KASClient.UI.KASFormModule();
            var titleDescriptionView = KASClient.UI.getElement("div", { "padding": "16px" });
            var titleDiv = KASClient.UI.getElement("div", { "margin-bottom": "16px", "border-bottom": "solid 1px #f6f6f6" });
            KASClient.UI.addElement(titleDiv, titleDescriptionView);
            var title = KASClient.UI.getLabel(Survey.SurveyResponse.getSurvey().title, {
                "font-size": KASClient.UI.getScaledFontSize("24px"),
                "font-weight": "500",
                "color": "#26374c",
                "margin-bottom": "8px"
            });
            KASClient.UI.addElement(title, titleDiv);
            var questionCountHtml = KASClient.UI.getElement("span", { "color": "#26374c" });
            questionCountHtml.innerText = "" + Survey.SurveyResponse.getIndependentQuestionsCount().toLocaleString();
            var questionCountText = Survey.SurveyResponse.getIndependentQuestionsCount() == 1 ? Survey.SurveyResponse.getLocalizedString("QuestionCountLabel", questionCountHtml.outerHTML) :
                Survey.SurveyResponse.getLocalizedString("QuestionsCountLabel", questionCountHtml.outerHTML);
            var questionCount = KASClient.UI.getLabel(questionCountText, {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": "#6f7e8f"
            });
            KASClient.UI.setAccessibilityBasic(questionCount, false, KASClient.UI.KASFormAccessibilityRole.Text);
            KASClient.UI.addElement(questionCount, titleDiv);
            var descriptionDiv = KASClient.UI.getElement("div", { "margin-top": "16px" });
            KASClient.UI.addElement(descriptionDiv, titleDescriptionView);
            var description = KASClient.UI.getLabel(Survey.SurveyResponse.getSurveyDescription(), {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": TEXT_PRIMARY_COLOR
            });
            KASClient.UI.addElement(description, descriptionDiv);
            titleDescriptionModule.contentView = titleDescriptionView;
            return titleDescriptionModule;
        };
        // Bottom Bar
        SurveyPreviewFormPage.prototype.getBottomBar = function () {
            var footerAttributes = {
                "padding-left": "16px",
                "padding-right": "16px",
                "padding-bottom": "16px",
                "background-color": "transparent",
                "width": "100%"
            };
            var footerView = KASClient.UI.getElement("div", footerAttributes);
            if (Survey.SurveyResponse.getSurvey().isLocationRequested) {
                var disclaimerLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("LocationDisclaimerText"), {
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "color": "#98a3af",
                    "margin-bottom": "16px",
                    "margin-left": "16px",
                    "margin-right": "16px",
                    "font-weight": "normal",
                    "text-align": "center"
                });
                KASClient.UI.setAccessibilityBasic(disclaimerLabel, false, KASClient.UI.KASFormAccessibilityRole.Text);
                KASClient.UI.addElement(disclaimerLabel, footerView);
            }
            var footerButtonAttributes = {
                "width": "100%",
                "padding": "10px",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
                "border-radius": "2px",
                "-webkit-appearance": "none",
                "background-color": BUTTON_BG_BLUE_COLOR,
                "color": "white"
            };
            footerButtonAttributes = Object.assign(footerButtonAttributes, KASClient.UI.getMediumFontAttributes());
            var footerButton = KASClient.UI.getElement("input", footerButtonAttributes);
            footerButton.type = "button";
            footerButton.value = Survey.SurveyResponse.getLocalizedString("Start");
            footerButton.onclick = function (event) {
                event.stopPropagation();
                Survey.SurveyResponse.startSurvey();
            };
            KASClient.UI.setAccessibilityBasic(footerButton, false, KASClient.UI.KASFormAccessibilityRole.Button);
            KASClient.UI.addElement(footerButton, footerView);
            return footerView;
        };
        return SurveyPreviewFormPage;
    }(Survey.SurveyResponseFormPage));
    Survey.SurveyPreviewFormPage = SurveyPreviewFormPage;
})(Survey || (Survey = {}));
/// <reference path="./../SurveyUIManager.ts" />
var Survey;
(function (Survey) {
    var SurveyResponse = /** @class */ (function (_super) {
        __extends(SurveyResponse, _super);
        function SurveyResponse(isPreview, pageNavigatorElement) {
            var _this = _super.call(this) || this;
            SurveyResponse.isPreview = isPreview;
            SurveyResponse.pageNavigator = new KASClient.UI.KASFormPageNavigator();
            KASClient.UI.addElement(SurveyResponse.pageNavigator.getView(), pageNavigatorElement);
            return _this;
        }
        SurveyResponse.prototype.initialize = function (finishCallback) {
            //Get the default form
            KASClient.App.getLocalizedStringsAsync(function (strings, error) {
                if (error != null) {
                    return;
                }
                SurveyResponse.strings = strings;
                document.title = SurveyResponse.strings["SurveyCreationPageTitle"];
                KASClient.Form.getFormAsync(function (form, error) {
                    if (error != null) {
                        return;
                    }
                    SurveyResponse.responseForm = form;
                    KASClient.App.getUsersDetailsAsync([form.creatorId], function (users, error) {
                        if (error != null) {
                            return;
                        }
                        SurveyResponse.creator = users[SurveyResponse.responseForm.creatorId];
                        KASClient.App.getDeviceLocationAsync(function (location, error) {
                            if (error != null) {
                                return;
                            }
                            if (location != null) {
                                SurveyResponse.location = location;
                            }
                            else {
                                SurveyResponse.location = SurveyResponse.getDefaultLocation();
                            }
                            KASClient.App.getPackagePropertiesAsync(function (properties, error) {
                                if (error != null) {
                                    return;
                                }
                                if (properties != null) {
                                    if (properties.hasOwnProperty(SurveyResponse.PACKAGE_USER_STRINGS)) {
                                        SurveyResponse.userStrings = JSON.parse(properties[SurveyResponse.PACKAGE_USER_STRINGS]);
                                    }
                                }
                                KASClient.App.getPackageCustomSettingsAsync(function (settings, error) {
                                    SurveyResponse.customSettings = settings;
                                    KASClient.Version.getClientSupportedVersion(function (version) {
                                        if (SurveyResponse.shouldShowIncompatibleScreen(version)) {
                                            KASClient.UI.showIncompatibleScreen();
                                            return;
                                        }
                                        if (SurveyResponse.getCustomSettingValue(SurveyResponse.IS_RESPONSE_CARD, false)) {
                                            if (finishCallback) {
                                                finishCallback();
                                            }
                                        }
                                        else {
                                            KASClient.Form.getMyFormResponsesAsync(function (responses, error) {
                                                if (error != null) {
                                                    return;
                                                }
                                                SurveyResponse.myResponses = responses;
                                                if (finishCallback) {
                                                    finishCallback();
                                                }
                                            });
                                        }
                                    });
                                });
                            });
                        });
                    });
                });
            });
        };
        SurveyResponse.prototype.inflateResponse = function () {
            if (SurveyResponse.getCustomSettingValue(SurveyResponse.HIDE_RESPONSE_FIRST_PAGE, false)) {
                SurveyResponse.startSurvey();
            }
            else {
                var surveyPreviewPage = new Survey.SurveyPreviewFormPage();
                SurveyResponse.getPageNavigator().pushPage(surveyPreviewPage);
            }
        };
        SurveyResponse.prototype.setLocationMapImageAndAddress = function (mapImage, address) {
            SurveyResponse.locationMapPath = mapImage;
            SurveyResponse.locationAddress = address;
            if (SurveyResponse.locationCallback) {
                SurveyResponse.locationCallback(mapImage, address);
            }
        };
        SurveyResponse.refreshLocation = function () {
            SurveyResponse.locationMapPath = "";
            SurveyResponse.locationAddress = "";
            KASClient.callNativeCommand("refreshMapInfo", [], null, null);
        };
        SurveyResponse.setLocationCallback = function (callback) {
            this.locationCallback = callback;
        };
        SurveyResponse.getSurvey = function () {
            return this.responseForm;
        };
        SurveyResponse.getVisibleQuestions = function () {
            if (this.visibleQuestions != null)
                return this.visibleQuestions;
            var questions = [];
            for (var i = 0; i < this.responseForm.questions.length; i++) {
                if ((!SurveyResponse.getCustomSettingValue(SurveyResponse.IS_RESPONSE_CARD, false)) && this.responseForm.isResponseAppended && i == 0)
                    continue;
                if (this.responseForm.questions[i].isInvisible)
                    continue;
                if (KASClient.getPlatform() == KASClient.Platform.Android && this.responseForm.questions[i].type == KASClient.KASQuestionType.Location)
                    continue;
                questions.push(this.responseForm.questions[i]);
            }
            this.visibleQuestions = questions;
            return this.visibleQuestions;
        };
        SurveyResponse.getIndependentQuestionsCount = function () {
            var questions = this.getVisibleQuestions();
            var independentQuestions = [];
            for (var i = 0; i < questions.length; i++) {
                if (questions[i].visif == null) {
                    independentQuestions.push(questions[i]);
                }
            }
            return independentQuestions.length;
        };
        SurveyResponse.shouldShowIncompatibleScreen = function (version) {
            var shouldShowIncompatScreen = false;
            var clientSdkVersion = parseInt(version);
            for (var i = 0; i < this.responseForm.questions.length; i++) {
                var question = this.responseForm.questions[i];
                shouldShowIncompatScreen = !this.isQuestionCompatibleWithVersion(question, clientSdkVersion);
                if (shouldShowIncompatScreen)
                    break;
            }
            return shouldShowIncompatScreen;
        };
        SurveyResponse.isQuestionCompatibleWithVersion = function (question, clientSdkVersion) {
            var isCompatible = true;
            // location, date, phonenumber, mulitple images are incompatible here
            if (clientSdkVersion < parseInt(KASClient.Version.VERSION_19)) {
                if (question.type == KASClient.KASQuestionType.Location ||
                    question.type == KASClient.KASQuestionType.DateOnly ||
                    question.type == KASClient.KASQuestionType.AttachmentList) {
                    isCompatible = false;
                }
                else if (question.type == KASClient.KASQuestionType.SingleSelect) {
                    var options = question.options;
                    // case for Android's old clients, where questionType defaults to SingleSelect for unknown types
                    if (options == null || options.length < 2) {
                        isCompatible = false;
                    }
                }
            }
            // isOptional, valif and visif attributes not supported check
            if (clientSdkVersion < parseInt(KASClient.Version.VERSION_21)) {
                if (SurveyResponse.getCustomSettingValue(SurveyResponse.HAS_OPTIONAL_QUESTIONS, false) ||
                    SurveyResponse.getCustomSettingValue(SurveyResponse.HAS_VALIF_OR_VISIF_IN_QUESTIONS, false)) {
                    isCompatible = false;
                }
            }
            return isCompatible;
        };
        SurveyResponse.getQuestionVisibility = function (question) {
            if (!question.visif || !question.visif.rule || Object.keys(question.visif.rule).length == 0)
                return true;
            var responses = Survey.SurveyResponse.responses;
            var responseObj = JSON.parse("{}");
            responseObj.question = responses;
            var visibility = KASClient.isDataValidAgainstRule(question.visif.rule, responseObj);
            return visibility;
        };
        SurveyResponse.prepareQuestionsForPages = function () {
            var visibleQuestions = this.getVisibleQuestions();
            this.visibleQuestionsForPage = [];
            var pageQuestions = [];
            var allQuestionsOnCurrentPageAreDependentAndInvisible = true;
            for (var i = 0; i < visibleQuestions.length; i++) {
                var question = visibleQuestions[i];
                var visibility = this.getQuestionVisibility(question);
                if (allQuestionsOnCurrentPageAreDependentAndInvisible && visibility) {
                    allQuestionsOnCurrentPageAreDependentAndInvisible = false;
                }
                if (!visibility)
                    delete this.responses[question.id];
                pageQuestions.push(question);
                if (question.config != null && question.config.pageBreakEnabled) {
                    if (!allQuestionsOnCurrentPageAreDependentAndInvisible)
                        this.visibleQuestionsForPage.push(pageQuestions);
                    pageQuestions = [];
                    allQuestionsOnCurrentPageAreDependentAndInvisible = true;
                }
            }
            if (!allQuestionsOnCurrentPageAreDependentAndInvisible) {
                this.visibleQuestionsForPage.push(pageQuestions);
            }
        };
        SurveyResponse.getQuestionsForPage = function (pageIndex) {
            if (this.visibleQuestionsForPage != null)
                return this.visibleQuestionsForPage[pageIndex];
            this.prepareQuestionsForPages();
            return this.visibleQuestionsForPage[pageIndex];
        };
        SurveyResponse.getNumberOfPages = function () {
            /*if (this.visibleQuestionsForPage != null)
                return this.visibleQuestionsForPage.length;*/
            this.prepareQuestionsForPages();
            return this.visibleQuestionsForPage.length;
        };
        SurveyResponse.getNumberOfQuestionForPage = function (pageIndex) {
            if (this.visibleQuestionsForPage != null)
                return this.visibleQuestionsForPage[pageIndex].length;
            this.prepareQuestionsForPages();
            return this.visibleQuestionsForPage[pageIndex].length;
        };
        SurveyResponse.openResponseSummary = function (responses) {
            this.responses = responses;
            if (this.hideLastPage()) {
                this.openResponseNameDailogIfNeeded();
            }
            else {
                var responseSummary = new Survey.SurveyResponseSummaryFormPage(this.responses);
                this.pageNavigator.pushPage(responseSummary);
            }
        };
        SurveyResponse.startSurvey = function () {
            // This case can occur when there are no visible questions in the survey. Example an attendance card without photo
            var visibileQuestions = SurveyResponse.getVisibleQuestions();
            if (!visibileQuestions || visibileQuestions.length === 0) {
                SurveyResponse.openResponseSummary(SurveyResponse.responses);
            }
            else {
                SurveyResponse.getPageNavigator().pushPage(new Survey.SurveyResponseQuestionFormPage());
            }
        };
        SurveyResponse.getDefaultLocation = function () {
            var location = JSON.parse("{}");
            location["lt"] = 0;
            location["lg"] = 0;
            location["n"] = "";
            return JSON.stringify(location);
        };
        SurveyResponse.submitResponse = function (resposneName) {
            var surveyResposne = JSON.parse("{}");
            var key = 0;
            if ((!SurveyResponse.getCustomSettingValue(SurveyResponse.IS_RESPONSE_CARD, false)) && this.responseForm.isResponseAppended) {
                surveyResposne[key++] = resposneName;
            }
            for (; key < this.responseForm.questions.length; key++) {
                var question = this.responseForm.questions[key];
                if (question.isInvisible) {
                    if (question.type == KASClient.KASQuestionType.DateTime) {
                        surveyResposne[key] = (new Date()).getTime();
                    }
                    else if (question.type == KASClient.KASQuestionType.Location) {
                        surveyResposne[key] = SurveyResponse.getDefaultLocation();
                    }
                    else {
                        surveyResposne[key] = "";
                    }
                    continue;
                }
                if (!(question.isResponseOptional && KASClient.isEmptyObject(this.responses[key]))) {
                    switch (this.responseForm.questions[key].type) {
                        case KASClient.KASQuestionType.SingleSelect:
                        case KASClient.KASQuestionType.MultiSelect:
                        case KASClient.KASQuestionType.PhoneNumber:
                        case KASClient.KASQuestionType.AttachmentList:
                            surveyResposne[key] = JSON.stringify(this.responses[key]);
                            break;
                        case KASClient.KASQuestionType.Text:
                        case KASClient.KASQuestionType.Numeric:
                        case KASClient.KASQuestionType.Image:
                        case KASClient.KASQuestionType.DateOnly:
                            surveyResposne[key] = this.responses[key];
                            break;
                        case KASClient.KASQuestionType.Location:
                            surveyResposne[key] = KASClient.getPlatform() == KASClient.Platform.Android ? this.location : this.locationAddress;
                            break;
                    }
                }
            }
            var showInChatCanvas = false;
            if (SurveyResponse.getCustomSettingValue(SurveyResponse.IS_RESPONSE_CARD, false)) {
                showInChatCanvas = true;
            }
            KASClient.Form.sumbitFormResponse(surveyResposne, null, false, showInChatCanvas, false);
        };
        SurveyResponse.getCreator = function () {
            return this.creator;
        };
        SurveyResponse.getLocationMapImagePath = function () {
            return this.locationMapPath;
        };
        SurveyResponse.getLocationAddress = function () {
            if (KASClient.getPlatform() == KASClient.Platform.Android) {
                var location = JSON.parse(this.location);
                this.locationAddress = location["n"];
            }
            return this.locationAddress;
        };
        SurveyResponse.getSurveyDescription = function () {
            if (this.description != null) {
                return this.description;
            }
            var properties = this.responseForm.properties;
            var description = "";
            for (var i = 0; i < properties.length; i++) {
                if (properties[i].name == "Description") {
                    description = properties[i].value;
                    break;
                }
            }
            this.description = description;
            return this.description;
        };
        SurveyResponse.getSurveyCoverImage = function () {
            if (this.coverImage != null) {
                return this.coverImage;
            }
            var properties = this.responseForm.properties;
            var coverImage = null;
            for (var i = 0; i < properties.length; i++) {
                if (properties[i].name == "CoverImage") {
                    coverImage = properties[i].value;
                    break;
                }
            }
            this.coverImage = coverImage;
            return this.coverImage;
        };
        SurveyResponse.getMyResponses = function () {
            return this.myResponses;
        };
        SurveyResponse.getSurveyResponseHeader = function () {
            if (this.userStrings != null && this.userStrings.hasOwnProperty(this.RESPONSE_PAGE_HEADER)) {
                return this.userStrings[this.RESPONSE_PAGE_HEADER];
            }
            else {
                return SurveyResponse.getLocalizedString("SurveyResponseTitle");
            }
        };
        SurveyResponse.hasCustomSetting = function (key) {
            if (this.customSettings == null)
                return false;
            return this.customSettings.hasOwnProperty(key);
        };
        SurveyResponse.getCustomSettingValue = function (key, defaultValue) {
            if (!this.hasCustomSetting(key))
                return defaultValue;
            return this.customSettings[key];
        };
        SurveyResponse.hideLastPage = function () {
            if (this.hasCustomSetting(this.HIDE_RESPONSE_LAST_PAGE))
                return this.getCustomSettingValue(this.HIDE_RESPONSE_LAST_PAGE, false);
            return false;
        };
        SurveyResponse.openResponseNameDailogIfNeeded = function () {
            if ((!SurveyResponse.getCustomSettingValue(SurveyResponse.IS_RESPONSE_CARD, false)) && SurveyResponse.getSurvey().isResponseAppended) {
                SurveyResponse.openResponseNameDailog();
            }
            else {
                SurveyResponse.submitResponse(null);
            }
        };
        SurveyResponse.openResponseNameDailog = function () {
            var responseName = SurveyResponse.getLocalizedString("DefaultResponseName", SurveyResponse.getMyResponses().length + 1);
            if (!this.getCustomSettingValue(this.SHOW_RESPONSE_NAME_DAILOG, true)) {
                SurveyResponse.submitResponse(responseName);
                return;
            }
            var contentDiv = KASClient.UI.getElement("div", {
                "margin-top": "16px",
                "margin-bottom": "16px"
            });
            var responseNameLabel = KASClient.UI.getLabel(SurveyResponse.getLocalizedString("YourResponseLabel"), {
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "color": "#5c6a7c"
            });
            KASClient.UI.addElement(responseNameLabel, contentDiv);
            var inputView = KASClient.UI.getElement("input", {
                "margin-top": "16px",
                "padding": "0px",
                "padding-bottom": "8px",
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "-webkit-appearance": "none",
                "width": "100%",
                "border-radius": "0px",
                "border": "none",
                "border-bottom": "solid .5px #d4d8db",
                "color": "#32485f"
            });
            inputView.type = "text";
            inputView.placeholder = SurveyResponse.getLocalizedString("SurveyQuestionPlaceHolder");
            inputView.value = responseName;
            inputView.onfocus = function () {
                KASClient.UI.addCSS(this, { "border-bottom": "solid 1.5px #00a1ff" });
            };
            inputView.onblur = function () {
                KASClient.UI.addCSS(this, { "border-bottom": "solid .5px #d4d8db" });
            };
            KASClient.UI.addElement(inputView, contentDiv);
            var alertAttributes = {
                "height": "100%",
                "width": "100%",
                "position": "fixed",
                "background-color": "rgba(50, 72, 95, 0.5)",
                "z-index": "2",
                "display": "flex",
                "flex": "1",
                "flex-direction": "column",
                "justify-content": "space-around"
            };
            var alertDiv = KASClient.UI.getElement("div", alertAttributes);
            var alertView = KASClient.UI.getElement("div", { "margin": "20px", "padding": "20px", "background-color": "white", "display": "flex", "flex-direction": "column" });
            KASClient.UI.addElement(alertView, alertDiv);
            var alertTitleView = KASClient.UI.getLabel(SurveyResponse.getLocalizedString("SubmitResponseTitle"), {
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("20px"),
                "font-weight": "600"
            });
            KASClient.UI.addElement(alertTitleView, alertView);
            KASClient.UI.addElement(contentDiv, alertView);
            var alertBottomView = KASClient.UI.getElement("div", { "display": "flex", "justify-content": "flex-end" });
            KASClient.UI.addElement(alertBottomView, alertView);
            var buttonAttributes = {
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "font-weight": "600",
                "margin-left": "20px",
                "color": "#00a1ff",
                "-webkit-appearance": "none",
                "border": "none"
            };
            var cancelButton = KASClient.UI.getLabel(SurveyResponse.getLocalizedString("Cancel"), buttonAttributes);
            KASClient.UI.setAccessibilityBasic(cancelButton, false, KASClient.UI.KASFormAccessibilityRole.Button);
            cancelButton.onclick = function () {
                KASClient.UI.removeElement(alertDiv, document.body);
                SurveyResponse.currentDailogView = null;
                SurveyResponse.setPageNavigatorAccessibilityHidden(false);
            };
            KASClient.UI.addElement(cancelButton, alertBottomView);
            var okButton = KASClient.UI.getLabel(SurveyResponse.getLocalizedString("Submit"), buttonAttributes);
            KASClient.UI.setAccessibilityBasic(okButton, false, KASClient.UI.KASFormAccessibilityRole.Button);
            okButton.onclick = function () {
                if (responseName.trim() == "")
                    return;
                KASClient.UI.removeElement(alertDiv, document.body);
                SurveyResponse.currentDailogView = null;
                SurveyResponse.setPageNavigatorAccessibilityHidden(false);
                SurveyResponse.submitResponse(responseName);
            };
            KASClient.UI.addElement(okButton, alertBottomView);
            inputView.oninput = function (target) {
                responseName = inputView.value;
                okButton.style.opacity = responseName.trim() == "" ? "0.5" : "1.0";
            };
            this.currentDailogView = alertDiv;
            SurveyResponse.setPageNavigatorAccessibilityHidden(true);
            KASClient.UI.addElement(this.currentDailogView, document.body);
        };
        SurveyResponse.closeSurveyResponse = function () {
            if (this.currentDailogView != null) {
                KASClient.UI.removeElement(this.currentDailogView, document.body);
                this.currentDailogView = null;
                SurveyResponse.setPageNavigatorAccessibilityHidden(false);
                return;
            }
            var deleteButton = KASClient.UI.getElement("div", {
                "color": LIGHT_RED_COLOR
            });
            deleteButton.innerText = SurveyResponse.getLocalizedString("QuestionDiscardConfirmationDailogDeleteButton");
            this.currentDailogView = KASClient.UI.getAlertDailog(this.getSurveyResponseHeader(), SurveyResponse.getLocalizedString("DiscardSurveyResponseDailogMessage"), deleteButton.outerHTML, function () {
                SurveyResponse.currentDailogView = null;
                SurveyResponse.setPageNavigatorAccessibilityHidden(false);
                SurveyResponse.getPageNavigator().goBack();
            }, SurveyResponse.getLocalizedString("QuestionDiscardConfirmationDailogBackButton"), function () {
                SurveyResponse.currentDailogView = null;
                SurveyResponse.setPageNavigatorAccessibilityHidden(false);
            });
            SurveyResponse.setPageNavigatorAccessibilityHidden(true);
            KASClient.UI.addElement(this.currentDailogView, document.body);
        };
        SurveyResponse.getQuestionTitleForDisplay = function (question) {
            var title = question.title;
            if (question.isResponseOptional) {
                title += " (" + SurveyResponse.getLocalizedString("Optional") + ")";
            }
            return title;
        };
        SurveyResponse.isPreview = false;
        SurveyResponse.responseForm = null;
        SurveyResponse.visibleQuestions = null;
        SurveyResponse.visibleQuestionsForPage = null;
        SurveyResponse.responses = {};
        SurveyResponse.creator = null;
        SurveyResponse.description = null;
        SurveyResponse.coverImage = null;
        SurveyResponse.myResponses = null;
        SurveyResponse.userStrings = null;
        SurveyResponse.customSettings = null;
        //handling location for iOS
        SurveyResponse.locationCallback = null;
        SurveyResponse.locationMapPath = null;
        SurveyResponse.locationAddress = "";
        // handling location for Android
        SurveyResponse.location = null;
        // Constants
        SurveyResponse.PACKAGE_USER_STRINGS = "userStrings";
        SurveyResponse.RESPONSE_PAGE_HEADER = "LabelHeader";
        // Custom Settings Constants
        SurveyResponse.IS_RESPONSE_CARD = "isResponseCard";
        SurveyResponse.HIDE_RESPONSE_FIRST_PAGE = "hideResponseViewFirstPage";
        SurveyResponse.HIDE_RESPONSE_LAST_PAGE = "hideResponseViewLastPage";
        SurveyResponse.SHOW_RESPONSE_NAME_DAILOG = "showResponseNameDailog";
        SurveyResponse.SHOW_LOCATION_IN_RESPONSE_SUMMARY = "showLocationInResponseSummary";
        SurveyResponse.HAS_OPTIONAL_QUESTIONS = "hasOptionalQuestions";
        SurveyResponse.HAS_VALIF_OR_VISIF_IN_QUESTIONS = "hasValifOrVisifInQuestions";
        SurveyResponse.currentDailogView = null;
        return SurveyResponse;
    }(Survey.SurveyUIManager));
    Survey.SurveyResponse = SurveyResponse;
})(Survey || (Survey = {}));
/// <reference path="./../../../../../../js/declarations/KASClientCore.d.ts" />
/// <reference path="./../../../../../../js/declarations/KASClientUI.d.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseQuestionModule = /** @class */ (function (_super) {
        __extends(SurveyResponseQuestionModule, _super);
        function SurveyResponseQuestionModule(index) {
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.response = null;
            _this.helpText = "";
            _this.errorText = "";
            _this.clearLabel = null;
            _this.clearLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("Clear"), {
                "font-size": KASClient.UI.getScaledFontSize("15px"),
                "font-weight": "500",
                "color": "rgba(0, 161, 255, 1)"
            });
            KASClient.UI.setAccessibilityBasic(_this.clearLabel, false, KASClient.UI.KASFormAccessibilityRole.Button);
            _this.index = index;
            _this.question = Survey.SurveyResponse.getVisibleQuestions()[index];
            return _this;
        }
        //attaches mutation observers(to detect DOM changes) to divs on which the current question depends
        //and whenever callback is received upon the change(mutation), visibility handler is invoked
        SurveyResponseQuestionModule.prototype.handleDependency = function (visibilityMetadata) {
            if (visibilityMetadata) {
                //DOM change event callback
                var mutationObserver = new MutationObserver(function (mutations) {
                    mutations.forEach(function (mutation) {
                        this.handleVisibility(visibilityMetadata);
                    }.bind(this));
                }.bind(this));
                setTimeout(function () {
                    this.handleVisibility(visibilityMetadata);
                    var dependsOn = this.buildDependencyQuestionList(visibilityMetadata);
                    dependsOn.forEach(function (questionId) {
                        var divId = document.getElementById(("questionDiv_") + questionId);
                        if (visibilityMetadata.hasOwnProperty("optionId")) {
                            var optDiv = document.getElementById("optionDiv_" + questionId + "_" + visibilityMetadata.optionId);
                            if (optDiv) {
                                divId = optDiv;
                            }
                        }
                        if (divId) {
                            //attaching the mutation observer
                            mutationObserver.observe(divId, {
                                attributes: true,
                                attributeFilter: ["value", "selected"]
                            });
                        }
                    });
                }.bind(this), 5);
            }
            else {
                this.addRemoveToCurrentVisibleQuestions(true, this.question.id);
            }
        };
        SurveyResponseQuestionModule.prototype.addRemoveToCurrentVisibleQuestions = function (addFlag, index) {
            if (addFlag) {
                if (Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.indexOf(index) == -1) {
                    var lastIndex = Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.length;
                    Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.push(index);
                    if (Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions[lastIndex - 1] > index) {
                        Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.sort(function compareNumbers(a, b) {
                            return a - b;
                        });
                    }
                }
            }
            else {
                var position = Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.indexOf(index);
                if (position > -1) {
                    Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.splice(position, 1);
                }
            }
        };
        SurveyResponseQuestionModule.prototype.getVisibleQuestionCount = function (index) {
            var qNo = Survey.SurveyResponseQuestionFormPage.currentVisibleQuestions.indexOf(index);
            if (qNo > -1)
                return qNo + 1;
            else
                return Survey.SurveyResponseQuestionType.getQuestionIndexForQuestionId(index) + 1;
        };
        //builds the list of question IDs on which current question depends - uses regex search
        //will us questionID array present in visif once portal starts supporting multi-question dependency
        SurveyResponseQuestionModule.prototype.buildDependencyQuestionList = function (visibilityMetadata) {
            var questionList = new Array();
            var rule = JSON.stringify(visibilityMetadata["rule"]);
            if (Survey.SurveyResponseQuestionFormPage.questionDependencyDict.hasOwnProperty(this.question.id)) {
                return Survey.SurveyResponseQuestionFormPage.questionDependencyDict[this.question.id];
            }
            var re = /question.(.*?)[$"]/g;
            var qString;
            do {
                qString = re.exec(rule);
                if (qString) {
                    questionList.push(qString[1].trim());
                }
            } while (qString);
            Survey.SurveyResponseQuestionFormPage.questionDependencyDict[this.question.id] = questionList;
            return questionList;
        };
        //evaluates the visif rule of the current question and handles DOM and response object accordingly
        SurveyResponseQuestionModule.prototype.handleVisibility = function (visibilityMetadata) {
            var responses = Survey.SurveyResponse.responses;
            var responseObj = JSON.parse("{}");
            responseObj.question = responses;
            var visibility = KASClient.isDataValidAgainstRule(visibilityMetadata["rule"], responseObj);
            var questionDiv = document.getElementById("questionDiv_" + this.question.id);
            if (questionDiv) {
                if (!visibility) {
                    questionDiv.style.display = "none";
                    if (!KASClient.isEmptyObject(this.response))
                        this.resetQuestionResponseUI();
                    this.response = "";
                    this.delegate.updateFormValidity(this.question.id, true);
                    this.delegate.clearAnswer(this.question.id);
                    this.addRemoveToCurrentVisibleQuestions(false, this.question.id);
                }
                else {
                    questionDiv.style.display = "flex";
                    this.addRemoveToCurrentVisibleQuestions(true, this.question.id);
                    this.delegate.setAnswer(this.question.id, this.response);
                }
            }
            this.adjustQuestionIndicesForPage();
            return visibility;
        };
        SurveyResponseQuestionModule.prototype.init = function () {
            this.contentView = KASClient.UI.getVerticalDiv(this.getSubViews());
            this.contentView.id = "questionDiv_" + this.question.id;
        };
        SurveyResponseQuestionModule.prototype.getSubViews = function () {
            return [this.getQuestionModule()];
        };
        SurveyResponseQuestionModule.prototype.getQuestionModule = function () {
            var questionView = KASClient.UI.getElement("div");
            var questionHeader = KASClient.UI.getElement("div", {
                "color": "#667787",
                "padding": "16px",
                "background": "rgba(114, 125, 136, 0.05)",
                "letter-spacing": "2px",
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "font-weight": "500"
            });
            questionHeader.id = "questionHeaderDiv_" + this.question.id;
            var questionNumber = this.getCurrentQuestionNumber(this.question.id);
            questionHeader.innerHTML = Survey.SurveyResponse.getLocalizedString("QuestionHeader", (questionNumber).toLocaleString());
            KASClient.UI.setAccessibilityBasic(questionHeader, false, KASClient.UI.KASFormAccessibilityRole.Text, Survey.SurveyResponse.getLocalizedString("QuestionHeader", (questionNumber)));
            KASClient.UI.addElement(questionHeader, questionView);
            var questionTitleLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getQuestionTitleForDisplay(this.question), {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": "#32485f",
                "padding-top": "16px",
                "padding-right": "16px",
                "padding-left": "16px"
            });
            KASClient.UI.addElement(questionTitleLabel, questionView);
            return questionView;
        };
        SurveyResponseQuestionModule.prototype.adjustQuestionIndicesForPage = function () {
            var counter = this.question.id;
            var nextQuestionHeaderDiv = document.getElementById("questionHeaderDiv_" + counter);
            while (nextQuestionHeaderDiv) {
                var questionNumber = this.getCurrentQuestionNumber(counter++);
                nextQuestionHeaderDiv.innerHTML = Survey.SurveyResponse.getLocalizedString("QuestionHeader", (questionNumber));
                KASClient.UI.setAccessibilityBasic(nextQuestionHeaderDiv, false, KASClient.UI.KASFormAccessibilityRole.Text, Survey.SurveyResponse.getLocalizedString("QuestionHeader", (questionNumber)));
                nextQuestionHeaderDiv = document.getElementById("questionHeaderDiv_" + (counter));
            }
        };
        SurveyResponseQuestionModule.prototype.getCurrentQuestionNumber = function (index) {
            return this.getVisibleQuestionCount(index);
        };
        SurveyResponseQuestionModule.prototype.getInputErrorElement = function (errorText, helpText) {
            if (errorText === void 0) { errorText = ""; }
            if (helpText === void 0) { helpText = ""; }
            var element = KASClient.UI.getDiv({ "padding-left": "16px",
                "padding-right": "16px" });
            var errorDiv = this.getErrorTextDiv(errorText);
            KASClient.UI.addElement(errorDiv, element);
            errorDiv.style.display = "none";
            var helpTextDiv = this.getHelpTextDiv(helpText);
            KASClient.UI.addElement(helpTextDiv, element);
            return element;
        };
        SurveyResponseQuestionModule.prototype.getHelpTextDiv = function (helpText) {
            helpText = helpText ? helpText : "";
            this.helpText = helpText;
            var helpTextDiv = KASClient.UI.getLabel(helpText, {
                "font-family": "Roboto",
                "font-size": "12px",
                "font-weight": "normal",
                "font-style": "normal",
                "font-stretch": "normal",
                "line-height": "normal",
                "letter-spacing": "normal",
                "text-align": "left",
                "color": "black"
            });
            helpTextDiv.id = "helpTextDiv_" + this.question.id;
            if (KASClient.isEmptyString(this.helpText)) {
                KASClient.UI.setAccessibilityAttribute(helpTextDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, "true");
            }
            else {
                KASClient.UI.setAccessibilityBasic(helpTextDiv, false, KASClient.UI.KASFormAccessibilityRole.Text, helpText);
            }
            return helpTextDiv;
        };
        SurveyResponseQuestionModule.prototype.getErrorTextDiv = function (errorText) {
            errorText = errorText ? errorText : "";
            this.errorText = errorText;
            var errorDiv = KASClient.UI.getLabel(errorText, {
                "font-family": "Roboto",
                "font-size": "12px",
                "font-weight": "normal",
                "font-style": "normal",
                "font-stretch": "normal",
                "line-height": "normal",
                "letter-spacing": "normal",
                "text-align": "left",
                "color": "#d0021b"
            });
            errorDiv.id = "errorDiv_" + this.question.id;
            if (KASClient.isEmptyString(this.errorText)) {
                KASClient.UI.setAccessibilityAttribute(errorDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, "true");
            }
            else {
                KASClient.UI.setAccessibilityBasic(errorDiv, true, "alert", errorText);
            }
            return errorDiv;
        };
        SurveyResponseQuestionModule.prototype.toggleInputErrorText = function (inputErrorElement, isInvalid) {
            var helpTextDiv = document.getElementById("helpTextDiv_" + this.question.id);
            var errorDiv = document.getElementById("errorDiv_" + this.question.id);
            if (helpTextDiv && errorDiv) {
                if (isInvalid) {
                    helpTextDiv.style.display = "none";
                    errorDiv.style.display = "block";
                }
                else if (!KASClient.isEmptyObject(this.response)) {
                    helpTextDiv.style.display = "block";
                    errorDiv.style.display = "none";
                }
                else {
                    helpTextDiv.style.display = "block";
                    errorDiv.style.display = "none";
                }
                if (KASClient.isEmptyString(this.helpText)) {
                    KASClient.UI.setAccessibilityAttribute(helpTextDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, "true");
                }
                else {
                    KASClient.UI.setAccessibilityAttribute(helpTextDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, isInvalid ? "true" : "false");
                }
                if (KASClient.isEmptyString(this.errorText)) {
                    KASClient.UI.setAccessibilityAttribute(errorDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, "true");
                }
                else {
                    KASClient.UI.setAccessibilityAttribute(errorDiv, KASClient.UI.KASFormAccessibilityKey.Hidden, isInvalid ? "false" : "true");
                }
            }
        };
        SurveyResponseQuestionModule.prototype.validateField = function (response, inputErrorElement) {
            var validationResult = new KASClient.KASQuestionValidationResponse();
            if (this.isValid()) {
                validationResult = this.question.validateResponse(response);
            }
            this.toggleInputErrorText(inputErrorElement, !validationResult.success);
            return validationResult.success;
        };
        // Clear label
        SurveyResponseQuestionModule.prototype.setClearButtonEnabled = function (enabled) {
            this.clearLabel.style.color = !enabled ? "rgba(0, 161, 255, 0.25)" : "rgba(0, 161, 255, 1)";
            KASClient.UI.setAccessibilityAttribute(this.clearLabel, KASClient.UI.KASFormAccessibilityKey.Disabled, "" + !enabled);
        };
        SurveyResponseQuestionModule.prototype.setFocus = function () {
            // To be implemented by derived classes, if required
        };
        // used to validate question's response
        SurveyResponseQuestionModule.prototype.isValid = function () {
            // To be implemented by derived classes, if required
            return true;
        };
        SurveyResponseQuestionModule.prototype.getValidationErrorString = function () {
            return "";
        };
        SurveyResponseQuestionModule.prototype.resetQuestionResponseUI = function () {
            // To be implemented by derived classes, if required
        };
        SurveyResponseQuestionModule.prototype.getOptionDivId = function (questionId, optionId) {
            return "optionDiv_" + questionId + "_" + optionId;
        };
        return SurveyResponseQuestionModule;
    }(KASClient.UI.KASFormModule));
    Survey.SurveyResponseQuestionModule = SurveyResponseQuestionModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseDateModule = /** @class */ (function (_super) {
        __extends(SurveyResponseDateModule, _super);
        function SurveyResponseDateModule(index) {
            var _this = _super.call(this, index) || this;
            _this.dateInputView = null;
            return _this;
        }
        SurveyResponseDateModule.prototype.getSubViews = function () {
            var selectedDate = null;
            if (this.response == null)
                this.response = "";
            else {
                if (!KASClient.isEmptyObject(this.response)) {
                    selectedDate = this.response;
                }
            }
            this.dateInputView = new KASClient.UI.KASDateInputView("", selectedDate ? new Date(selectedDate) : null, Survey.SurveyResponse.getLocalizedString("DateResponseTapToAddDate"), this.dateChanged.bind(this));
            this.dateInputView.allowPastDate = true;
            this.dateInputView.showYear = true;
            var generatedDateInputView = this.dateInputView.getView();
            KASClient.UI.addCSS(generatedDateInputView, { "padding": "8px 16px" });
            return _super.prototype.getSubViews.call(this).concat([generatedDateInputView]);
        };
        SurveyResponseDateModule.prototype.dateChanged = function (selectedDate) {
            var date = new Date(selectedDate);
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var dateString = date.getFullYear() + "-" + ((month < 10) ? "0" + month : month) + "-" + ((day < 10) ? "0" + day : day);
            if (!KASClient.isEmptyObject(dateString)) {
                this.response = dateString;
            }
            else {
                this.response = "";
            }
            this.updateResponse();
        };
        SurveyResponseDateModule.prototype.updateResponse = function () {
            if (this.response == "") {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseDateModule.prototype.resetQuestionResponseUI = function () {
            this.response = "";
            this.dateInputView.setDate(null);
        };
        return SurveyResponseDateModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseDateModule = SurveyResponseDateModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseDropDownModule = /** @class */ (function (_super) {
        __extends(SurveyResponseDropDownModule, _super);
        function SurveyResponseDropDownModule(index) {
            return _super.call(this, index) || this;
        }
        SurveyResponseDropDownModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = -1;
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseDropDownModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {});
            var clearDiv = KASClient.UI.getElement("div", {
                "float": "right",
                "padding-left": "16px",
                "padding-right": "16px",
                "padding-top": "8px",
                "padding-bottom": "20px"
            });
            this.setClearButtonEnabled(this.response !== "");
            var optionStrings = [], selectedIndexes = [];
            for (var i = 0; i < this.question.options.length; i++) {
                optionStrings.push(this.question.options[i].text);
                if (this.response != "" && i === this.response) {
                    selectedIndexes.push(i);
                }
            }
            this.dropDown = new KASClient.UI.KASFormDropDown(new KASClient.UI.KASDropDownModel(optionStrings, selectedIndexes, false, false));
            this.clearLabel.onclick = function () {
                if (this.response != -1 && this.response !== "") {
                    this.resetQuestionResponseUI();
                }
            }.bind(this);
            KASClient.UI.addElement(this.clearLabel, clearDiv);
            var answerDropDown = KASClient.UI.getDiv({
                "border": "1px solid #e3e3e3",
                "background": "rgba(114, 125, 136, 0.05)",
                "height": "48px",
                "margin": "15px",
                "display": "flex",
                "flex-direction": "row"
            });
            answerDropDown.onclick = function () {
                this.showDropDown();
            }.bind(this);
            var myResponseLabelString = (this.response == -1 || KASClient.isEmptyObject(this.response)) ? Survey.SurveyResponse.getLocalizedString("TapToSelectOptionText") : this.dropDown.dropDownModel.optionsAsStrings[this.response];
            this.myResponseLabel = KASClient.UI.getLabel(myResponseLabelString, {
                "margin": "auto 0",
                "width": "80%",
                "padding-left": "10px",
                "font-size": KASClient.getScaledFontSize("16px"),
                "align-items": "center",
                "color": "#006ff1",
                "display": "flex",
                "text-overflow": "hidden",
                "-webkit-box-orient": "vertical",
                "overflow": "hidden",
                "-webkit-line-clamp": "1"
            });
            var downChevron = KASClient.UI.getImage("dropDownExpand.png", {
                "height": "9px",
                "width": "12px",
                "margin": "auto",
                "align-items": "center",
                "display": "flex"
            });
            KASClient.UI.setAccessibilityBasic(downChevron, true);
            KASClient.UI.addElement(this.myResponseLabel, answerDropDown);
            KASClient.UI.addElement(downChevron, answerDropDown);
            KASClient.UI.setAccessibilityBasic(answerDropDown, false, KASClient.UI.KASFormAccessibilityRole.Text, (this.response == -1 ? "" : myResponseLabelString) + ". " + Survey.SurveyResponse.getLocalizedString("Drop Down") + ". " + Survey.SurveyResponse.getLocalizedString("TapToSelectOptionText"));
            KASClient.UI.addElement(answerDropDown, answerView);
            KASClient.UI.addElement(clearDiv, answerView);
            var cancelClickCallback = function () {
                this.onDropDownClose();
            }.bind(this);
            // display = none by default
            this.dropDownContainer = KASClient.UI.getAlertDialogWithDiv(this.dropDown.getView(), true, cancelClickCallback);
            this.dropDown.rowSelectCallBack = function (index, optionText, isUnSelect) {
                this.onDropDownClose();
                if (!isUnSelect) {
                    this.setResponse(optionText, index);
                }
                else {
                    this.setDefaultResponse();
                }
                KASClient.UI.setAccessibilityBasic(answerDropDown, false, KASClient.UI.KASFormAccessibilityRole.Text, (isUnSelect ? "" : optionText) + ". " + Survey.SurveyResponse.getLocalizedString("Drop Down") + ". " + Survey.SurveyResponse.getLocalizedString("TapToSelectOptionText"));
                this.setClearButtonEnabled(this.response !== "" && this.response != -1);
                this.updateResponse();
            }.bind(this);
            return answerView;
        };
        SurveyResponseDropDownModule.prototype.setDefaultResponse = function () {
            this.setResponse(Survey.SurveyResponse.getLocalizedString("TapToSelectOptionText"), -1);
        };
        SurveyResponseDropDownModule.prototype.setResponse = function (response, responseIndex) {
            this.myResponseLabel.innerText = response;
            this.response = responseIndex;
        };
        SurveyResponseDropDownModule.prototype.showDropDown = function () {
            this.dropDownContainer.style.display = "block";
            this.dropDownContainer.onclick = function () {
                var viewTapped = (event.target);
                var dropDownView = (this.dropDown.getView());
                if (!dropDownView.contains(viewTapped)) {
                    this.onDropDownClose();
                }
            }.bind(this);
            if (KASClient.getPlatform() == KASClient.Platform.Android) {
                KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                    if (talkBackEnabled) {
                        this.dropDownContainer.onclick = null;
                        Survey.SurveyResponse.setPageNavigatorAccessibilityHidden(false);
                    }
                }.bind(this));
            }
            this.delegate.presentDialog(this.dropDownContainer);
        };
        SurveyResponseDropDownModule.prototype.onDropDownClose = function () {
            this.delegate.dismissDialog();
        };
        SurveyResponseDropDownModule.prototype.updateResponse = function () {
            if (this.response == -1 && this.question.isResponseOptional) {
                this.delegate.setAnswer(this.question.id, this.response = "");
            }
            else if (this.response == -1) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseDropDownModule.prototype.resetQuestionResponseUI = function () {
            this.setClearButtonEnabled(false);
            this.dropDown.resetSelections();
            this.dropDown.rowSelectCallBack(-1, "", true);
        };
        return SurveyResponseDropDownModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseDropDownModule = SurveyResponseDropDownModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseImageUploadModule = /** @class */ (function (_super) {
        __extends(SurveyResponseImageUploadModule, _super);
        function SurveyResponseImageUploadModule(index) {
            var _this = _super.call(this, index) || this;
            _this.imageContainer = null;
            return _this;
        }
        SurveyResponseImageUploadModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = "";
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseImageUploadModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {
                "padding-left": "16px",
                "padding-right": "16px"
            });
            var headerDiv = KASClient.UI.getElement("div", {
                "display": "flex",
                "justify-content": "space-between",
                "align-items": "center"
            });
            KASClient.UI.addElement(headerDiv, answerView);
            var chooseAnswerLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("YourResponseLabel"), {
                "color": "#000000",
                "font-size": KASClient.UI.getScaledFontSize("12px"),
                "font-weight": "500"
            });
            KASClient.UI.setAccessibilityBasic(chooseAnswerLabel, false, KASClient.UI.KASFormAccessibilityRole.Text);
            KASClient.UI.addElement(chooseAnswerLabel, headerDiv);
            this.setClearButtonEnabled(this.response != "");
            this.clearLabel.onclick = function () {
                if (this.response == "")
                    return;
                this.resetQuestionResponseUI();
            }.bind(this);
            KASClient.UI.addElement(this.clearLabel, headerDiv);
            this.imageContainer = KASClient.UI.getElement("div", {
                "margin-top": "16px",
                "width": "100%",
                "min-height": "200px",
                "border-radius": "4px",
                "background-color": "#ffffff",
                "border": "solid 1px #00a1ff",
                "display": "flex",
                "justify-content": "space-around",
                "flex-direction": "column",
                "overflow": "hidden"
            });
            this.imageContainer.onclick = this.onImageContainerClicked.bind(this);
            KASClient.UI.addElement(this.imageContainer, answerView);
            this.refreshImageContainer();
            return answerView;
        };
        SurveyResponseImageUploadModule.prototype.refreshImageContainer = function () {
            var config = this.question.config;
            KASClient.UI.clearElement(this.imageContainer);
            if (this.response == "") {
                var emptyDiv = KASClient.UI.getElement("div", {
                    "display": "flex",
                    "flex-direction": "column"
                });
                KASClient.UI.addElement(emptyDiv, this.imageContainer);
                var isCameraOnly = (config.imageSource == KASClient.ImagePickerSource.CameraBack || config.imageSource == KASClient.ImagePickerSource.CameraFront);
                var defaultImg = KASClient.UI.getImage(isCameraOnly ? "camera.png" : "imageUploadPlaceholder.png", {
                    "object-fit": "contain",
                    "width": "92px",
                    "align-self": "center"
                });
                KASClient.UI.setAccessibilityBasic(defaultImg, true);
                KASClient.UI.addElement(defaultImg, emptyDiv);
                var defaultText = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString(isCameraOnly ? "TapToOpenCamera" : "TapToAddPhoto"), {
                    "margin-top": "16px",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "color": "#00a1ff",
                    "text-align": "center"
                });
                KASClient.UI.setAccessibilityBasic(defaultText, false, KASClient.UI.KASFormAccessibilityRole.Button);
                KASClient.UI.addElement(defaultText, emptyDiv);
            }
            else {
                var imageView = KASClient.UI.getImage(this.response, { "width": "100%" });
                imageView.onclick = function () {
                    KASClient.App.showImageImmersiveView([this.response]);
                }.bind(this);
                KASClient.UI.setAccessibilityBasic(imageView, false, KASClient.UI.KASFormAccessibilityRole.Image);
                KASClient.UI.addElement(imageView, this.imageContainer);
            }
        };
        SurveyResponseImageUploadModule.prototype.onImageContainerClicked = function () {
            var config = this.question.config;
            var props = JSON.parse("{}");
            if (config != null) {
                props = config.toJSON();
            }
            props[KASClient.KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY] = 1;
            KASClient.App.showAttachmentPickerAsync([KASClient.KASAttachmentType.Image], props, function (selectedAttachments, error) {
                if (error != null) {
                    return;
                }
                if (selectedAttachments.length > 1) {
                    KASClient.UI.showAlertDailog(Survey.SurveyResponse.getSurveyResponseHeader(), Survey.SurveyResponse.getLocalizedString("MultipleImageSelectionError"), Survey.SurveyResponse.getLocalizedString("OK"), null, "", null);
                }
                this.response = (selectedAttachments.length === 0) ? "" : selectedAttachments[0].localPath;
                this.updateResponse();
                this.setClearButtonEnabled(this.response != "");
                this.refreshImageContainer();
            }.bind(this));
        };
        SurveyResponseImageUploadModule.prototype.updateResponse = function () {
            if (this.response == "" && !this.question.isResponseOptional) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseImageUploadModule.prototype.resetQuestionResponseUI = function () {
            this.response = "";
            this.updateResponse();
            this.setClearButtonEnabled(this.response != "");
            this.refreshImageContainer();
        };
        return SurveyResponseImageUploadModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseImageUploadModule = SurveyResponseImageUploadModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseLocationModule = /** @class */ (function (_super) {
        __extends(SurveyResponseLocationModule, _super);
        function SurveyResponseLocationModule() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.isRefreshing = false;
            return _this;
        }
        SurveyResponseLocationModule.prototype.getSubViews = function () {
            Survey.SurveyResponse.setLocationCallback(this.setLocation.bind(this));
            this.response = Survey.SurveyResponse.getLocationAddress();
            this.mapImageView = this.getLocationMapImageModule();
            this.addressView = this.getLocationAddressModule();
            var childViews = [this.getLocationHeaderModule(), this.mapImageView, this.addressView];
            this.updateResponse();
            return childViews;
        };
        SurveyResponseLocationModule.prototype.getLocationHeaderModule = function () {
            var contentView = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("ReponseLocationPageHeader", Survey.SurveyResponse.getCreator().originalName), {
                "padding": "16px",
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": "#32485f"
            });
            KASClient.UI.setAccessibilityBasic(contentView, false, KASClient.UI.KASFormAccessibilityRole.Text);
            return contentView;
        };
        SurveyResponseLocationModule.prototype.getLocationMapImageModule = function () {
            var mapImageDiv = KASClient.UI.getDiv({
                "width": "100%"
            });
            var mapSrc = Survey.SurveyResponse.getLocationMapImagePath();
            if (mapSrc == "") {
                mapSrc = "locationPlaceholder.png";
            }
            var mapImage = KASClient.UI.getImage(mapSrc, {
                "width": "100%"
            });
            KASClient.UI.addElement(mapImage, mapImageDiv);
            KASClient.UI.setAccessibilityBasic(mapImageDiv, true);
            return mapImageDiv;
        };
        SurveyResponseLocationModule.prototype.getLocationAddressModule = function () {
            var addressView = KASClient.UI.getDiv({
                "padding": "16px",
                "display": "flex",
                "flex-direction": "row",
                "justify-content": "space-between",
            });
            if (!this.isRefreshing) {
                if (Survey.SurveyResponse.getLocationAddress() != "") {
                    var addressLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocationAddress(), {
                        "font-size": KASClient.UI.getScaledFontSize("16px"),
                        "font-weight": "500",
                        "color": "#32485f"
                    });
                    KASClient.UI.setAccessibilityBasic(addressLabel, false, KASClient.UI.KASFormAccessibilityRole.Text);
                    KASClient.UI.addElement(addressLabel, addressView);
                }
                else {
                    KASClient.UI.addElement(this.getNoLocationLabelDiv(), addressView);
                }
                var refreshView = KASClient.UI.getElement("div", {
                    "display": "flex",
                    "flex-direction": "column",
                    "align-items": "center"
                });
                KASClient.UI.addElement(refreshView, addressView);
                var refreshIcon = KASClient.UI.getImage("refresh.png", {
                    "overflow": "hidden",
                    "object-fit": "contain",
                    "width": "18px"
                });
                KASClient.UI.setAccessibilityBasic(refreshIcon, true);
                KASClient.UI.addElement(refreshIcon, refreshView);
                var refreshLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("Refresh"), {
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "font-weight": "500",
                    "color": "#006ff1",
                    "padding-top": "8px",
                    "word-break": "normal"
                });
                KASClient.UI.setAccessibilityBasic(refreshLabel, false, KASClient.UI.KASFormAccessibilityRole.Button);
                KASClient.UI.addElement(refreshLabel, refreshView);
                refreshView.onclick = function () {
                    this.refreshLocation();
                }.bind(this);
            }
            else {
                KASClient.UI.addElement(this.getNoLocationLabelDiv(), addressView);
            }
            return addressView;
        };
        SurveyResponseLocationModule.prototype.getNoLocationLabelDiv = function () {
            var noLocationDiv = KASClient.UI.getDiv();
            var noAddressLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("LocationUnavaliable"), {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "font-weight": "500",
                "color": "#32485f"
            });
            KASClient.UI.addElement(noAddressLabel, noLocationDiv);
            var noAddressHintLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("LocationTryAgain"), {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "font-weight": "500",
                "color": "#6f7e8f"
            });
            KASClient.UI.addElement(noAddressHintLabel, noLocationDiv);
            KASClient.UI.setAccessibilityBasic(noLocationDiv, false, KASClient.UI.KASFormAccessibilityRole.Text);
            return noLocationDiv;
        };
        SurveyResponseLocationModule.prototype.refreshLocation = function () {
            this.isRefreshing = true;
            this.response = "";
            this.updateResponse();
            Survey.SurveyResponse.refreshLocation();
            setTimeout(function () {
                this.setLocation("", "");
            }.bind(this), 10000);
            this.updateLocation();
        };
        SurveyResponseLocationModule.prototype.setLocation = function (mapImage, address) {
            this.isRefreshing = false;
            this.response = Survey.SurveyResponse.getLocationAddress();
            this.updateLocation();
            this.updateResponse();
        };
        SurveyResponseLocationModule.prototype.updateLocation = function () {
            var newMapImageView = this.getLocationMapImageModule();
            var newAddressView = this.getLocationAddressModule();
            this.refreshView(this.mapImageView, newMapImageView);
            this.refreshView(this.addressView, newAddressView);
            this.mapImageView = newMapImageView;
            this.addressView = newAddressView;
        };
        SurveyResponseLocationModule.prototype.updateResponse = function () {
            if (this.response == "") {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        return SurveyResponseLocationModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseLocationModule = SurveyResponseLocationModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseMultipleImageUploadModule = /** @class */ (function (_super) {
        __extends(SurveyResponseMultipleImageUploadModule, _super);
        function SurveyResponseMultipleImageUploadModule(index) {
            var _this = _super.call(this, index) || this;
            _this.imageContainer = null;
            _this.MAX_ATTACHMENTS = 10;
            return _this;
        }
        SurveyResponseMultipleImageUploadModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = "";
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseMultipleImageUploadModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {
                "padding-left": "16px",
                "padding-right": "16px"
            });
            this.imageContainer = KASClient.UI.getElement("div", {
                "margin-top": "16px",
                "width": "100%",
                "height": "100%",
                "display": "flex",
                "justify-content": "space-around",
                "flex-direction": "column",
                "overflow": "hidden"
            });
            var config = this.question.config;
            var props = JSON.parse("{}");
            if (config != null) {
                props = config.toJSON();
            }
            props[KASClient.KASAttachmentListQuestionConfig.MAX_IMAGE_COUNT_KEY] = this.MAX_ATTACHMENTS;
            this.gridView = new KASClient.UI.KASImageGridAlbumView("", (this.response == null || this.response == "") ? [] : this.response, false, props, this.onAttachmentsPicked.bind(this));
            this.gridView.setImagePickerSource(props[KASClient.KASAttachmentListQuestionConfig.IMAGE_SOURCE_KEY]);
            this.gridView.setMaxImageCount(this.MAX_ATTACHMENTS);
            KASClient.UI.addElement(this.gridView.getView(), this.imageContainer);
            KASClient.UI.addElement(this.imageContainer, answerView);
            return answerView;
        };
        SurveyResponseMultipleImageUploadModule.prototype.onAttachmentsPicked = function (selectedAttachments) {
            if (selectedAttachments == null || selectedAttachments.length == 0) {
                this.response = "";
            }
            else {
                for (var i = 0; i < selectedAttachments.length; i++) {
                    selectedAttachments[i].generateThumbnailServerUrl = true;
                }
                this.response = selectedAttachments;
            }
            this.updateResponse();
        };
        SurveyResponseMultipleImageUploadModule.prototype.updateResponse = function () {
            if (this.response == "" && !this.question.isResponseOptional) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        return SurveyResponseMultipleImageUploadModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseMultipleImageUploadModule = SurveyResponseMultipleImageUploadModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseMultiSelectModule = /** @class */ (function (_super) {
        __extends(SurveyResponseMultiSelectModule, _super);
        function SurveyResponseMultiSelectModule(index) {
            var _this = _super.call(this, index) || this;
            _this.optionDivArray = [];
            _this.optionCheckboxArray = [];
            return _this;
        }
        SurveyResponseMultiSelectModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = [];
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseMultiSelectModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {});
            var optionListDiv = KASClient.UI.getElement("div", { "margin-top": "16px", "border-top": "solid 1px #f5f5f5" });
            KASClient.UI.addElement(optionListDiv, answerView);
            for (var i = 0; i < this.question.options.length; i++) {
                var option = this.question.options[i];
                var optionDiv = KASClient.UI.getElement("div", {
                    "display": "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "border-bottom": "solid 1px #f5f5f5"
                });
                this.optionDivArray[i] = optionDiv;
                optionDiv.id = this.getOptionDivId(this.question.id, i);
                optionDiv.onclick = function (i, optionDiv) {
                    var optionCheckbox = this.optionCheckboxArray[i];
                    KASClient.UI.setAccessibilityAttribute(this.optionDivArray[i], KASClient.UI.KASFormAccessibilityKey.Checked, "" + !(optionCheckbox.checked));
                    optionCheckbox.click();
                }.bind(this, i, optionDiv);
                KASClient.UI.setAccessibilityBasic(optionDiv, false, KASClient.UI.KASFormAccessibilityRole.Checkbox);
                KASClient.UI.setAccessibilityAttribute(optionDiv, KASClient.UI.KASFormAccessibilityKey.Checked, "" + (this.response.indexOf(i) > -1));
                KASClient.UI.setAccessibilityAttribute(optionDiv, KASClient.UI.KASFormAccessibilityKey.Label, option.text);
                KASClient.UI.addElement(optionDiv, optionListDiv);
                var optionLabel = KASClient.UI.getLabel(option.text, {
                    "font-size": KASClient.UI.getScaledFontSize("16px"),
                    "color": "#32485f",
                    "padding": "12px"
                });
                KASClient.UI.setAccessibilityBasic(optionLabel, true);
                KASClient.UI.addElement(optionLabel, optionDiv);
                var checkBoxDiv = KASClient.UI.getElement("div", { "border-left": "solid 1px #f5f5f5", "padding": "12px" });
                KASClient.UI.addElement(checkBoxDiv, optionDiv);
                var checkBoxInput = KASClient.UI.getElement("input");
                KASClient.UI.setAccessibilityBasic(checkBoxInput, true);
                checkBoxInput.type = "checkbox";
                checkBoxInput.checked = this.response.indexOf(i) > -1;
                checkBoxInput.name = "question" + this.index;
                this.optionCheckboxArray[i] = checkBoxInput;
                checkBoxInput.onclick = function (event) {
                    event.stopPropagation();
                };
                checkBoxInput.onchange = function (i) {
                    var index = this.response.indexOf(i);
                    var optionDivDom = document.getElementById(this.getOptionDivId(this.question.id, i));
                    if (index > -1) {
                        this.response.splice(index, 1);
                        optionDivDom.setAttribute("selected", "false");
                    }
                    else {
                        if (KASClient.isEmptyObject(this.response))
                            this.response = [];
                        this.response.push(i);
                        optionDivDom.setAttribute("selected", "true");
                    }
                    this.setClearButtonEnabled(this.response.length != 0);
                    this.updateResponse();
                }.bind(this, i);
                KASClient.UI.addElement(checkBoxInput, checkBoxDiv);
            }
            return answerView;
        };
        SurveyResponseMultiSelectModule.prototype.updateResponse = function () {
            if (this.response.length == 0 && this.question.isResponseOptional) {
                this.delegate.setAnswer(this.question.id, this.response = "");
            }
            else if (this.response.length == 0) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseMultiSelectModule.prototype.resetQuestionResponseUI = function () {
            for (var i = 0; i < this.response.length; i++) {
                var optionCheckbox = this.optionCheckboxArray[i];
                optionCheckbox.checked = false;
                document.getElementById(this.getOptionDivId(this.question.id, i)).setAttribute("selected", "false");
                KASClient.UI.setAccessibilityAttribute(this.optionDivArray[i], KASClient.UI.KASFormAccessibilityKey.Checked, "" + false);
            }
            this.response = [];
            this.updateResponse();
        };
        return SurveyResponseMultiSelectModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseMultiSelectModule = SurveyResponseMultiSelectModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var NUMERIC_MAX_LENGTH = 16;
var Survey;
(function (Survey) {
    var SurveyResponseNumericAnswerModule = /** @class */ (function (_super) {
        __extends(SurveyResponseNumericAnswerModule, _super);
        function SurveyResponseNumericAnswerModule(index) {
            var _this = _super.call(this, index) || this;
            _this.inputErrorElement = null;
            _this.inputView = null;
            return _this;
        }
        SurveyResponseNumericAnswerModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = "";
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule(), this.inputErrorElement]);
        };
        SurveyResponseNumericAnswerModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {
                "padding-left": "16px",
                "padding-right": "16px"
            });
            var inputView = KASClient.UI.getElement("input", {
                "margin-top": "16px",
                "padding": "0px",
                "padding-bottom": "8px",
                "font-size": KASClient.UI.getScaledFontSize("24px"),
                "-webkit-appearance": "none",
                "width": "100%",
                "border-radius": "0px",
                "border": "none",
                "border-bottom": "solid .5px #d4d8db"
            });
            inputView.type = "number";
            inputView.value = this.response;
            inputView.maxLength = 16;
            inputView.placeholder = Survey.SurveyResponse.getLocalizedString("NumericPlaceHolderText");
            var errorMark = KASClient.UI.getElement("span", { "color": "#ea526f" });
            errorMark.innerText = "*";
            var helpText = "", errorString = errorMark.outerHTML + Survey.SurveyResponse.getLocalizedString("NumericInputErrorLabel");
            if (this.question.valif != null) {
                errorString = this.getValidationErrorString();
                helpText = this.getHelpTextString();
                ;
            }
            this.inputErrorElement = _super.prototype.getInputErrorElement.call(this, errorString, helpText);
            inputView.onfocus = function () {
                if (inputView.validity.badInput)
                    KASClient.UI.addCSS(inputView, { "border-bottom": "solid 1px #ea526f" });
                else
                    KASClient.UI.addCSS(inputView, { "border-bottom": "solid 1.5px #00a1ff" });
                this.toggleInputErrorText(this.inputErrorElement, false);
            }.bind(this, inputView);
            inputView.onblur = function () {
                KASClient.UI.addCSS(inputView, { "border-bottom": "solid .5px #d4d8db" });
                var validity = this.isValid();
                if (validity) {
                    if (!KASClient.isEmptyObject(this.response))
                        validity = this.validateField(this.inputView.value, this.inputErrorElement);
                }
                if (validity) {
                    KASClient.UI.addCSS(inputView, { "border-bottom": "solid 1.5px #00a1ff" });
                }
                else {
                    KASClient.UI.addCSS(inputView, { "border-bottom": "solid 2px #de2d4f" });
                    this.delegate.clearAnswer(this.question.id);
                }
                this.delegate.updateFormValidity(this.question.id, validity);
            }.bind(this, inputView);
            inputView.oninput = function (target) {
                this.response = target.value;
                this.setClearButtonEnabled(this.response != "");
                this.updateResponse();
            }.bind(this, inputView);
            var clearDiv = KASClient.UI.getElement("div", {
                "float": "right",
                "padding-top": "8px"
            });
            this.clearLabel.onclick = function () {
                if (this.response == "")
                    return;
                this.resetQuestionResponseUI();
            }.bind(this, inputView);
            this.setClearButtonEnabled(this.response != "");
            KASClient.UI.addElement(this.clearLabel, clearDiv);
            this.inputView = inputView;
            KASClient.UI.addElement(inputView, answerView);
            KASClient.UI.addElement(clearDiv, answerView);
            this.toggleInputErrorText(this.inputErrorElement, false);
            return answerView;
        };
        SurveyResponseNumericAnswerModule.prototype.updateResponse = function () {
            if (!this.isValid()) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
            this.toggleInputErrorText(this.inputErrorElement, !this.isValid());
        };
        SurveyResponseNumericAnswerModule.prototype.setFocus = function () {
            KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                if (!talkBackEnabled) {
                    setTimeout(function () {
                        this.focus();
                    }.bind(this.inputView), 100);
                }
            }.bind(this));
        };
        SurveyResponseNumericAnswerModule.prototype.isValid = function () {
            var isBadInput = this.inputView.validity.badInput;
            if (isBadInput) {
                return false;
            }
            else {
                var isEmptyObject = KASClient.isEmptyObject(this.inputView.value);
                var isValidNumber = !this.inputView.validity.badInput && this.inputView.value.length <= NUMERIC_MAX_LENGTH;
                return (isEmptyObject && this.question.isResponseOptional) || isValidNumber;
            }
        };
        SurveyResponseNumericAnswerModule.prototype.getValidationErrorString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.errorString, this.question.valif.attributes.minValue, this.question.valif.attributes.maxValue);
        };
        SurveyResponseNumericAnswerModule.prototype.getHelpTextString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.helpText, this.question.valif.attributes.minValue, this.question.valif.attributes.maxValue);
        };
        SurveyResponseNumericAnswerModule.prototype.resetQuestionResponseUI = function () {
            this.inputView.value = this.response = "";
            this.setClearButtonEnabled(this.response != "");
            this.updateResponse();
            KASClient.UI.addCSS(this.inputView, { "border-bottom": "solid .5px #d4d8db" });
            this.toggleInputErrorText(this.inputErrorElement, false);
        };
        return SurveyResponseNumericAnswerModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseNumericAnswerModule = SurveyResponseNumericAnswerModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponsePhoneNumberModule = /** @class */ (function (_super) {
        __extends(SurveyResponsePhoneNumberModule, _super);
        function SurveyResponsePhoneNumberModule(index) {
            var _this = _super.call(this, index) || this;
            _this.inputErrorElement = null;
            _this.phoneNumberInputView = null;
            return _this;
        }
        SurveyResponsePhoneNumberModule.prototype.getSubViews = function () {
            var phoneNumberResponse = new KASClient.KASPhoneNumber();
            if (this.response == null)
                this.response = "";
            else {
                phoneNumberResponse = KASClient.KASPhoneNumber.fromJSON(this.response);
            }
            this.phoneNumberInputView = new KASClient.UI.KASPhoneNumberInputView("", phoneNumberResponse.countryPhoneCode, phoneNumberResponse.phoneNumber);
            this.phoneNumberInputView.onChangeCallback = function (phoneNumberInfo) {
                if (!KASClient.isEmptyObject(phoneNumberInfo.countryPhoneCode + "") && !KASClient.isEmptyObject(phoneNumberInfo.phoneNumber)) {
                    phoneNumberResponse.countryPhoneCode = phoneNumberInfo.countryPhoneCode;
                    phoneNumberResponse.phoneNumber = phoneNumberInfo.phoneNumber;
                    this.response = phoneNumberResponse.toJSON();
                }
                else {
                    this.response = "";
                }
                this.updateResponse();
            }.bind(this);
            var helpText = "", errorString = "";
            if (this.question.valif != null) {
                errorString = this.getValidationErrorString();
                helpText = this.getHelpTextString();
            }
            this.inputErrorElement = _super.prototype.getInputErrorElement.call(this, errorString, helpText);
            this.phoneNumberInputView.onFocusCallback = function (phoneNumberInfo) {
                this.toggleInputErrorText(this.inputErrorElement, false);
            }.bind(this);
            this.phoneNumberInputView.onBlurCallback = function (phoneNumberInfo) {
                var validity;
                if (KASClient.isEmptyObject(phoneNumberInfo.phoneNumber))
                    validity = this.question.isResponseOptional;
                else
                    validity = this.validateField(phoneNumberInfo.phoneNumber, this.inputErrorElement);
                if (!validity) {
                    this.delegate.clearAnswer(this.question.id);
                }
                this.delegate.updateFormValidity(this.question.id, validity);
            }.bind(this);
            this.toggleInputErrorText(this.inputErrorElement, false);
            var generatedPhoneNumberInputView = this.phoneNumberInputView.getView();
            KASClient.UI.addCSS(generatedPhoneNumberInputView, { "padding": "8px 16px" });
            return _super.prototype.getSubViews.call(this).concat([generatedPhoneNumberInputView, this.inputErrorElement]);
        };
        SurveyResponsePhoneNumberModule.prototype.updateResponse = function () {
            if (this.response == "" && !this.question.isResponseOptional) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponsePhoneNumberModule.prototype.isValid = function () {
            return true;
        };
        SurveyResponsePhoneNumberModule.prototype.getValidationErrorString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.errorString, this.question.valif.attributes.maxValue);
        };
        SurveyResponsePhoneNumberModule.prototype.getHelpTextString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.helpText, this.question.valif.attributes.maxValue);
        };
        SurveyResponsePhoneNumberModule.prototype.resetQuestionResponseUI = function () {
            this.phoneNumberInputView.setPhoneNumber("");
            this.updateResponse();
            this.toggleInputErrorText(this.inputErrorElement, false);
        };
        return SurveyResponsePhoneNumberModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponsePhoneNumberModule = SurveyResponsePhoneNumberModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseQuestionFormPage = /** @class */ (function (_super) {
        __extends(SurveyResponseQuestionFormPage, _super);
        function SurveyResponseQuestionFormPage() {
            var _this = _super.call(this) || this;
            _this.currentPageIndex = 0;
            _this.questionToAnswerDict = {};
            _this.footerView = null;
            _this.currentPageValidity = true;
            _this.questionValidityDict = {};
            _this.bottomBarHeight = "106px";
            _this.currentDailogView = null;
            _this.navigationBar.title = Survey.SurveyResponse.getSurveyResponseHeader();
            _this.questionToAnswerDict = Survey.SurveyResponse.responses;
            var currentPageQuestions = Survey.SurveyResponse.getQuestionsForPage(_this.currentPageIndex);
            _this.questionValidityDict = {};
            _this.addDefaultAnswerToQuestionAtIndex(_this.currentPageIndex);
            _this.currentPageIndex = 0;
            _this.moduleContainer = Survey.SurveyResponseQuestionType.getContainer(_this.currentPageIndex, _this);
            KASClient.UI.addCSS(_this.moduleContainer.getView(), {
                "margin-bottom": _this.bottomBarHeight
            });
            _this.navigationBar.backAction = function () {
                if (this.currentDailogView != null && this.currentDailogView.style.display != "none") {
                    this.clearDailogView();
                    return;
                }
                if (Survey.SurveyResponse.getCustomSettingValue(Survey.SurveyResponse.HIDE_RESPONSE_FIRST_PAGE, false)) {
                    Survey.SurveyResponse.closeSurveyResponse();
                }
                else {
                    Survey.SurveyResponse.getPageNavigator().goBack();
                }
            }.bind(_this);
            // Footer View
            _this.bottomBar.attributes = {
                "height": _this.bottomBarHeight,
                "align-items": "flex-end",
                "box-shadow": "none",
                "background-color": "transparent",
                "background": "-webkit-linear-gradient(rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,1) 100%)"
            };
            _this.bottomBar.elements = [_this.getBottomBar()];
            return _this;
        }
        SurveyResponseQuestionFormPage.prototype.clearDailogView = function () {
            if (this.currentDailogView != null) {
                KASClient.UI.removeElement(this.currentDailogView, document.body);
                this.currentDailogView = null;
                Survey.SurveyResponse.setPageNavigatorAccessibilityHidden(false);
            }
        };
        SurveyResponseQuestionFormPage.prototype.addDailogView = function () {
            KASClient.UI.addElement(this.currentDailogView, document.body);
            Survey.SurveyResponse.setPageNavigatorAccessibilityHidden(true);
        };
        SurveyResponseQuestionFormPage.prototype.presentDialog = function (element) {
            this.clearDailogView();
            this.currentDailogView = element;
            this.addDailogView();
        };
        SurveyResponseQuestionFormPage.prototype.dismissDialog = function () {
            this.clearDailogView();
        };
        SurveyResponseQuestionFormPage.prototype.getBottomBar = function () {
            var footerView;
            if (Survey.SurveyResponse.getNumberOfPages() > 1) {
                footerView = this.getFooterViewForMultipleQuestion();
            }
            else {
                footerView = this.getFooterViewForSingleQuestion();
            }
            this.footerView = footerView;
            return this.footerView;
        };
        SurveyResponseQuestionFormPage.prototype.getFooterViewForSingleQuestion = function () {
            var footerView = this.footerView;
            if (footerView == null) {
                footerView = KASClient.UI.getElement("div", {});
            }
            else {
                KASClient.UI.clearElement(footerView);
            }
            var footerAttributes = {
                "padding-left": "16px",
                "padding-right": "16px",
                "padding-bottom": "16px",
                "background-color": "transparent",
                "width": "100%"
            };
            KASClient.UI.addCSS(footerView, footerAttributes);
            var isNextDisabled = this.isNextDisabled();
            var footerButtonAttributes = {
                "width": "100%",
                "padding": "10px",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "font-weight": "500",
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
                "border-radius": "2px",
                "-webkit-appearance": "none",
                "background-color": BUTTON_BG_BLUE_COLOR,
                "color": "white",
                "opacity": isNextDisabled ? 0.5 : 1.0
            };
            footerButtonAttributes = Object.assign(footerButtonAttributes, KASClient.UI.getMediumFontAttributes());
            var footerButton = KASClient.UI.getElement("input", footerButtonAttributes);
            footerButton.type = "button";
            footerButton.value = Survey.SurveyResponse.getLocalizedString(Survey.SurveyResponse.hideLastPage() ? "Submit" : "Next");
            KASClient.UI.setAccessibilityBasic(footerButton, false, KASClient.UI.KASFormAccessibilityRole.Button, null);
            KASClient.UI.setAccessibilityAttribute(footerButton, KASClient.UI.KASFormAccessibilityKey.Disabled, isNextDisabled ? "true" : "false");
            footerButton.onclick = isNextDisabled ? null : this.moveToNextPage.bind(this);
            KASClient.UI.addElement(footerButton, footerView);
            return footerView;
        };
        SurveyResponseQuestionFormPage.prototype.getFooterViewForMultipleQuestion = function () {
            var footerView = this.footerView;
            if (footerView == null) {
                footerView = KASClient.UI.getElement("div", {});
            }
            else {
                KASClient.UI.clearElement(footerView);
            }
            var footerAttributes = {
                "padding-left": "16px",
                "padding-right": "16px",
                "padding-bottom": "16px",
                "background-color": "transparent",
                "width": "100%",
                "display": "flex",
                "flex-direction": "row"
            };
            KASClient.UI.addCSS(footerView, footerAttributes);
            var isPrevDisabled = this.currentPageIndex == 0;
            var prevButtonAttributes = {
                "padding": "10px",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "font-weight": "500",
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
                "border-radius": "2px",
                "-webkit-appearance": "none",
                "background-color": "white",
                "color": "white",
                "margin-right": "10px",
                "width": "100%",
                "background-image": "url(upArrow.png)",
                "background-repeat": "no-repeat",
                "background-size": "11px 11px",
                "background-position": "center",
                "opacity": isPrevDisabled ? 0.5 : 1
            };
            var prevButton = KASClient.UI.getElement("input", prevButtonAttributes);
            prevButton.type = "button";
            prevButton.onclick = isPrevDisabled ? null : this.moveToPreviousPage.bind(this);
            KASClient.UI.setAccessibilityBasic(prevButton, false, KASClient.UI.KASFormAccessibilityRole.Button, Survey.SurveyResponse.getLocalizedString("PreviousButtonTitle"));
            KASClient.UI.setAccessibilityAttribute(prevButton, KASClient.UI.KASFormAccessibilityKey.Disabled, isPrevDisabled ? "true" : "false");
            KASClient.UI.addElement(prevButton, footerView);
            // Progress view
            var progressDiv = KASClient.UI.getElement("div", {
                "margin": "2px",
                "display": "flex",
                "align-items": "center",
                "margin-right": "10px",
                "width": "100%",
                "border-radius": "2px",
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
            });
            KASClient.UI.setAccessibilityBasic(progressDiv, true);
            var progressInnerDiv = KASClient.UI.getElement("div", { "width": "100%" });
            var currentPageCount = KASClient.UI.getElement("span", KASClient.UI.getMediumFontAttributes());
            currentPageCount.innerText = "" + (this.currentPageIndex + 1);
            var totalPageCount = KASClient.UI.getElement("span", KASClient.UI.getMediumFontAttributes());
            totalPageCount.innerText = "" + Survey.SurveyResponse.getNumberOfPages();
            var progressText = KASClient.UI.getElement("div", {
                "width": "100%",
                "text-align": "center",
                "padding-bottom": "3pt",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "color": "#32485f",
                "font-weight": "normal"
            });
            progressText.innerHTML = Survey.SurveyResponse.getLocalizedString("ProgressTextLabel", (this.currentPageIndex + 1).toLocaleString(), Survey.SurveyResponse.getNumberOfPages().toLocaleString());
            var progressBarOuterDiv = KASClient.UI.getElement("div", { "width": "80%", "height": "2pt", "background-color": "rgba(152, 163, 175, .25)", "margin-left": "10%" });
            var progressBarInnerDiv = KASClient.UI.getElement("div", { "width": "" + ((this.currentPageIndex + 1) * 100 / Survey.SurveyResponse.getNumberOfPages()) + "%", "height": "100%", "background-color": "rgb(253, 158, 40)" });
            KASClient.UI.addElement(progressBarInnerDiv, progressBarOuterDiv);
            KASClient.UI.addElement(progressText, progressInnerDiv);
            KASClient.UI.addElement(progressBarOuterDiv, progressInnerDiv);
            KASClient.UI.addElement(progressInnerDiv, progressDiv);
            KASClient.UI.addElement(progressDiv, footerView);
            var isNextDisabled = this.isNextDisabled();
            var isLastPage = (this.currentPageIndex == Survey.SurveyResponse.getNumberOfPages() - 1);
            var nextButtonAttributes = {
                "padding": "10px",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "font-weight": "500",
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
                "border-radius": "2px",
                "-webkit-appearance": "none",
                "background-color": BUTTON_BG_BLUE_COLOR,
                "color": "white",
                "width": "100%",
                "background-image": isLastPage ? null : "url(downArrow.png)",
                "background-repeat": "no-repeat",
                "background-size": "11px 11px",
                "background-position": "center",
                "opacity": isNextDisabled ? 0.5 : 1.0
            };
            nextButtonAttributes = Object.assign(nextButtonAttributes, KASClient.UI.getMediumFontAttributes());
            var nextButton = KASClient.UI.getElement("input", nextButtonAttributes);
            nextButton.type = "button";
            nextButton.value = isLastPage ? Survey.SurveyResponse.getLocalizedString(Survey.SurveyResponse.hideLastPage() ? "Submit" : "Next") : "";
            KASClient.UI.setAccessibilityBasic(nextButton, false, KASClient.UI.KASFormAccessibilityRole.Button, !isLastPage ? Survey.SurveyResponse.getLocalizedString("Next") : null);
            KASClient.UI.setAccessibilityAttribute(nextButton, KASClient.UI.KASFormAccessibilityKey.Disabled, isNextDisabled ? "true" : "false");
            nextButton.onclick = isNextDisabled ? null : this.moveToNextPage.bind(this);
            KASClient.UI.addElement(nextButton, footerView);
            return footerView;
        };
        SurveyResponseQuestionFormPage.prototype.isNextDisabled = function () {
            var currentPageQuestions = Survey.SurveyResponse.getQuestionsForPage(this.currentPageIndex);
            for (var i = 0; i < currentPageQuestions.length; i++) {
                var question = currentPageQuestions[i];
                // if questionId is present in this map, that means valid answer has been entered by user in the inputbox for this question
                if (!this.questionToAnswerDict.hasOwnProperty(question.id) && Survey.SurveyResponse.getQuestionVisibility(question)) {
                    return true;
                }
                else {
                    var answer = this.questionToAnswerDict[question.id];
                    if (answer === "" && !question.isResponseOptional) {
                        return true;
                    }
                }
            }
            return false;
        };
        SurveyResponseQuestionFormPage.prototype.refreshBottomBar = function () {
            this.bottomBar.elements = [this.getBottomBar()];
        };
        SurveyResponseQuestionFormPage.prototype.setAnswer = function (questionId, answer) {
            var questionModule = document.getElementById(("questionDiv_") + questionId);
            if (questionModule) {
                /*if(questionModule.hasAttribute("value") && questionModule.getAttribute("value").localeCompare(answer) == 0) {
                    return;
                }*/
                questionModule.setAttribute("value", answer);
            }
            this.questionToAnswerDict[questionId] = answer;
            Survey.SurveyResponse.responses = this.questionToAnswerDict;
            this.refreshBottomBar();
        };
        SurveyResponseQuestionFormPage.prototype.clearAnswer = function (questionId) {
            var questionModule = document.getElementById(("questionDiv_") + questionId);
            if (questionModule) {
                if (questionModule.hasAttribute("value") && questionModule.getAttribute("value").localeCompare("") == 0) {
                    return;
                }
                questionModule.setAttribute("value", "");
            }
            delete this.questionToAnswerDict[questionId];
            Survey.SurveyResponse.responses = this.questionToAnswerDict;
            this.refreshBottomBar();
        };
        SurveyResponseQuestionFormPage.prototype.addDefaultAnswerToQuestionAtIndex = function (pageIndex) {
            var questions = Survey.SurveyResponse.getQuestionsForPage(pageIndex);
            for (var i = 0; i < questions.length; i++) {
                var question = questions[i];
                if (!this.questionToAnswerDict.hasOwnProperty(question.id))
                    this.questionToAnswerDict[question.id] = "";
                if (question.isResponseOptional && !this.questionValidityDict.hasOwnProperty(question.id))
                    this.questionValidityDict[question.id] = true;
            }
        };
        SurveyResponseQuestionFormPage.prototype.updateFormValidity = function (questionId, validity) {
            this.questionValidityDict[questionId] = validity;
            this.currentPageValidity = true;
            var currentPageQuestions = Survey.SurveyResponse.getQuestionsForPage(this.currentPageIndex);
            for (var i = 0; i < currentPageQuestions.length; i++) {
                var question = currentPageQuestions[i];
                if (this.questionValidityDict.hasOwnProperty(question.id))
                    this.currentPageValidity = this.currentPageValidity && this.questionValidityDict[question.id];
            }
        };
        ;
        SurveyResponseQuestionFormPage.prototype.moveToNextPage = function () {
            if (!this.currentPageValidity)
                return;
            if (this.currentPageIndex == Survey.SurveyResponse.getNumberOfPages() - 1) {
                Survey.SurveyResponse.openResponseSummary(this.questionToAnswerDict);
            }
            else {
                this.currentPageIndex += 1;
                this.addDefaultAnswerToQuestionAtIndex(this.currentPageIndex);
                this.replaceModuleContainer(true);
                this.refreshBottomBar();
            }
        };
        SurveyResponseQuestionFormPage.prototype.moveToPreviousPage = function () {
            this.currentPageIndex -= 1;
            this.replaceModuleContainer(false);
            this.refreshBottomBar();
            this.currentPageValidity = true;
        };
        SurveyResponseQuestionFormPage.prototype.replaceModuleContainer = function (next) {
            var newModuleContainer = Survey.SurveyResponseQuestionType.getContainer(this.currentPageIndex, this);
            var oldContainer = this.moduleContainer.getView();
            var newContainer = newModuleContainer.getView();
            var animationTime = 0.2;
            if (next) {
                KASClient.UI.addCSS(newContainer, {
                    "margin-bottom": this.bottomBarHeight,
                    "-webkit-animation": "next-page-in " + animationTime + "s 1 ease-out",
                    "animation": "next-page-in " + animationTime + "s 1 ease-out"
                });
            }
            else {
                KASClient.UI.addCSS(newContainer, {
                    "margin-bottom": this.bottomBarHeight,
                    "-webkit-animation": "prev-page-in " + animationTime + "s 1 ease-in",
                    "animation": "prev-page-in " + animationTime + "s 1 ease-in"
                });
            }
            KASClient.UI.replaceElement(newContainer, oldContainer, this.getView());
            setTimeout(function () {
                KASClient.Internal.screenChanged();
            }, animationTime * 1000);
            this.moduleContainer = newModuleContainer;
        };
        SurveyResponseQuestionFormPage.questionDependencyDict = {};
        SurveyResponseQuestionFormPage.currentVisibleQuestions = [];
        return SurveyResponseQuestionFormPage;
    }(Survey.SurveyResponseFormPage));
    Survey.SurveyResponseQuestionFormPage = SurveyResponseQuestionFormPage;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var SurveyResponseQuestionFormPageDelegate = /** @class */ (function () {
        function SurveyResponseQuestionFormPageDelegate() {
        }
        return SurveyResponseQuestionFormPageDelegate;
    }());
    Survey.SurveyResponseQuestionFormPageDelegate = SurveyResponseQuestionFormPageDelegate;
})(Survey || (Survey = {}));
var Survey;
(function (Survey) {
    var AttachmentListResponseType = KASClient.AttachmentListResponseType;
    var SurveyResponseQuestionType = /** @class */ (function () {
        function SurveyResponseQuestionType() {
        }
        SurveyResponseQuestionType.kasTypeToPickerType = function (type, displayType) {
            var pickerType;
            switch (type) {
                case 0:
                    switch (displayType) {
                        case 0:
                            pickerType = 4;
                            break;
                        default:
                            pickerType = 0;
                            break;
                    }
                    break;
                case 1:
                    pickerType = 0;
                    break;
                case 2:
                    pickerType = 1;
                    break;
                case 3:
                    pickerType = 2;
                    break;
                case 6:
                    pickerType = 3;
                    break;
                case 8:
                    pickerType = 3;
                    break;
                case 9:
                    pickerType = 5;
                    break;
                case 10:
                    pickerType = 6;
                    break;
                default:
                    pickerType = 0;
                    break;
            }
            return pickerType;
        };
        SurveyResponseQuestionType.getLocalizedName = function (type) {
            if (type === void 0) { type = -1; }
            if (type < -1)
                return "";
            for (var i = 0; i < this.questionTypeForPicker.length; i++) {
                if (this.questionTypeForPicker[i]["type"] == type) {
                    return Survey.SurveyResponse.getLocalizedString(this.questionTypeForPicker[i]["name"]);
                }
            }
            return null;
        };
        SurveyResponseQuestionType.getIcon = function (type) {
            if (type === void 0) { type = -1; }
            if (type < 0)
                return "";
            for (var i = 0; i < this.questionTypeForPicker.length; i++) {
                if (this.questionTypeForPicker[i]["type"] == type) {
                    return this.questionTypeForPicker[i]["src"];
                }
            }
            return null;
        };
        SurveyResponseQuestionType.getPickerQuestionType = function (kasType, kasQuestionDisplayType) {
            if (kasType === void 0) { kasType = KASClient.KASQuestionType.None; }
            if (kasQuestionDisplayType === void 0) { kasQuestionDisplayType = KASClient.KASQuestionDisplayType.None; }
            return this.kasTypeToPickerType(kasType, kasQuestionDisplayType);
        };
        SurveyResponseQuestionType.getQuestionIndexForQuestionId = function (questionId) {
            var visibleQuestions = Survey.SurveyResponse.getVisibleQuestions();
            var questionIndex = -1;
            for (var i = 0; i < visibleQuestions.length; i++) {
                if (visibleQuestions[i].id == questionId) {
                    questionIndex = i;
                    break;
                }
            }
            return questionIndex;
        };
        SurveyResponseQuestionType.getContainer = function (pageIndex, delegate) {
            var pageQuestions = Survey.SurveyResponse.getQuestionsForPage(pageIndex);
            var questionToAnswerMap = Survey.SurveyResponse.responses;
            var questionModuleContainer = new KASClient.UI.KASFormModuleContainer();
            questionModuleContainer.backgroundColor = "white";
            var firstPageQuestions = Survey.SurveyResponse.getQuestionsForPage(0);
            // if Survey has isMulitpleResponses allowed, startingIndex will be 1, otherwise 0.
            // This is done to match question indexes in getQuestionsForPage's response and getVisibleQuestions's response
            var startingIndex = (firstPageQuestions.length) > 0 ? firstPageQuestions[0].id : 0;
            for (var i = 0; i < pageQuestions.length; i++) {
                var question = pageQuestions[i];
                var questionDisplayType = question.displayType;
                var questionType = question.type;
                var questionIndex = this.getQuestionIndexForQuestionId(question.id);
                var questionModule = null;
                switch (questionType) {
                    case KASClient.KASQuestionType.SingleSelect:
                        {
                            switch (questionDisplayType) {
                                case KASClient.KASQuestionDisplayType.DropDown:
                                    questionModule = new Survey.SurveyResponseDropDownModule(questionIndex);
                                    break;
                                default:
                                    questionModule = new Survey.SurveyResponseSingleSelectModule(questionIndex);
                                    break;
                            }
                        }
                        break;
                    case KASClient.KASQuestionType.MultiSelect:
                        questionModule = new Survey.SurveyResponseMultiSelectModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.Text:
                        questionModule = new Survey.SurveyResponseTextAnswerModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.Numeric:
                        questionModule = new Survey.SurveyResponseNumericAnswerModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.Image:
                        questionModule = new Survey.SurveyResponseImageUploadModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.AttachmentList:
                        if (question.config.attachmentListType == AttachmentListResponseType.LIST_OF_IMAGES) {
                            questionModule = new Survey.SurveyResponseMultipleImageUploadModule(questionIndex);
                        }
                        else {
                            questionModule = new Survey.SurveyResponseQuestionModule(questionIndex);
                        }
                        break;
                    case KASClient.KASQuestionType.Location:
                        questionModule = new Survey.SurveyResponseLocationModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.PhoneNumber:
                        questionModule = new Survey.SurveyResponsePhoneNumberModule(questionIndex);
                        break;
                    case KASClient.KASQuestionType.DateOnly:
                        questionModule = new Survey.SurveyResponseDateModule(questionIndex);
                        break;
                    default:
                        questionModule = new Survey.SurveyResponseQuestionModule(questionIndex);
                        break;
                }
                questionModule.delegate = delegate;
                questionModule.response = questionToAnswerMap[question.id];
                questionModule.init();
                if (question.hasOwnProperty("visif"))
                    questionModule.handleDependency(question["visif"]);
                questionModuleContainer.addModuleWithFullWidth(questionModule);
                // We will enable focus only for the first question
                if (i == 0) {
                    if (!((KASClient.getPlatform() == KASClient.Platform.iOS) && (KASClient.iOS.getWebview() == KASClient.iOS.WebView.WKWebView)))
                        questionModule.setFocus();
                }
            }
            return questionModuleContainer;
        };
        SurveyResponseQuestionType.questionTypeForPicker = [
            {
                "type": 0,
                "name": "Multiple Choice",
                "background-color": "#a0df89",
                "src": "multipleChoiceIcon.png"
            },
            {
                "type": 1,
                "name": "Text Response",
                "background-color": "#bf93ec",
                "src": "textResponseIcon.png"
            },
            {
                "type": 2,
                "name": "Numeric Response",
                "background-color": "#f788e1",
                "src": "numberResponseIcon.png"
            },
            {
                "type": 3,
                "name": "Image Upload",
                "background-color": "#50d789",
                "src": "imageResponseIcon.png"
            },
            {
                "type": 4,
                "name": "Drop Down",
                "background-color": "#f788e1",
                "src": "dropDownIcon.png"
            },
            {
                "type": 5,
                "name": "Phone Number",
                "background-color": "#f788e1",
                "src": "phoneNumberIcon.png"
            },
            {
                "type": 6,
                "name": "Date",
                "background-color": "#f788e1",
                "src": "dateIcon.png"
            }
        ];
        return SurveyResponseQuestionType;
    }());
    Survey.SurveyResponseQuestionType = SurveyResponseQuestionType;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseSingleSelectModule = /** @class */ (function (_super) {
        __extends(SurveyResponseSingleSelectModule, _super);
        function SurveyResponseSingleSelectModule(index) {
            var _this = _super.call(this, index) || this;
            _this.optionDivArray = [];
            _this.optionRadioButtonArray = [];
            return _this;
        }
        SurveyResponseSingleSelectModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = "";
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseSingleSelectModule.prototype.getAnswerModule = function () {
            var answerView = KASClient.UI.getElement("div", {});
            var optionListDiv = KASClient.UI.getElement("div", { "margin-top": "16px", "border-top": "solid 1px #f5f5f5" });
            KASClient.UI.addElement(optionListDiv, answerView);
            for (var i = 0; i < this.question.options.length; i++) {
                var option = this.question.options[i];
                var optionDiv = KASClient.UI.getElement("div", {
                    "display": "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "border-bottom": "solid 1px #f5f5f5"
                });
                this.optionDivArray[i] = optionDiv;
                optionDiv.id = this.getOptionDivId(this.question.id, i);
                optionDiv.onclick = function (i) {
                    if (this.response != -1 && this.response !== "")
                        KASClient.UI.setAccessibilityAttribute(this.optionDivArray[this.response], KASClient.UI.KASFormAccessibilityKey.Checked, "false");
                    KASClient.UI.setAccessibilityAttribute(this.optionDivArray[i], KASClient.UI.KASFormAccessibilityKey.Checked, "true");
                    var optionDivDom = document.getElementById(this.getOptionDivId(this.question.id, i));
                    var oldOptionDivDom = document.getElementById(this.getOptionDivId(this.question.id, this.response));
                    optionDivDom.setAttribute("selected", "true");
                    if (oldOptionDivDom)
                        oldOptionDivDom.setAttribute("selected", "false");
                    this.response = i;
                    var radioOption = this.optionRadioButtonArray[this.response];
                    radioOption.checked = true;
                    this.setClearButtonEnabled(this.response != "");
                    this.updateResponse();
                }.bind(this, i);
                KASClient.UI.setAccessibilityBasic(optionDiv, false, KASClient.UI.KASFormAccessibilityRole.Radio);
                KASClient.UI.setAccessibilityAttribute(optionDiv, KASClient.UI.KASFormAccessibilityKey.Checked, "" + (this.response === i));
                KASClient.UI.setAccessibilityAttribute(optionDiv, KASClient.UI.KASFormAccessibilityKey.Label, option.text);
                KASClient.UI.addElement(optionDiv, optionListDiv);
                var optionLabel = KASClient.UI.getLabel(option.text, {
                    "font-size": KASClient.UI.getScaledFontSize("16px"),
                    "color": "#32485f",
                    "padding": "12px"
                });
                KASClient.UI.setAccessibilityBasic(optionLabel, true);
                KASClient.UI.addElement(optionLabel, optionDiv);
                var radioDiv = KASClient.UI.getElement("div", { "border-left": "solid 1px #f5f5f5", "padding": "12px" });
                KASClient.UI.addElement(radioDiv, optionDiv);
                var radioInput = KASClient.UI.getElement("input");
                KASClient.UI.setAccessibilityBasic(radioInput, true);
                radioInput.type = "radio";
                radioInput.checked = this.response === i;
                radioInput.name = "question" + this.index;
                this.optionRadioButtonArray[i] = radioInput;
                KASClient.UI.addElement(radioInput, radioDiv);
            }
            return answerView;
        };
        SurveyResponseSingleSelectModule.prototype.updateResponse = function () {
            if (!this.isValid()) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseSingleSelectModule.prototype.resetQuestionResponseUI = function () {
            this.optionRadioButtonArray[this.response].checked = false;
            KASClient.UI.setAccessibilityAttribute(this.optionDivArray[this.response], KASClient.UI.KASFormAccessibilityKey.Checked, "false");
            var oldOptionDivDom = document.getElementById(this.getOptionDivId(this.question.id, this.response));
            if (oldOptionDivDom)
                oldOptionDivDom.setAttribute("selected", "false");
            this.response = "";
            this.updateResponse();
        };
        return SurveyResponseSingleSelectModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseSingleSelectModule = SurveyResponseSingleSelectModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseFormPage.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseSummaryFormPage = /** @class */ (function (_super) {
        __extends(SurveyResponseSummaryFormPage, _super);
        function SurveyResponseSummaryFormPage(responses) {
            var _this = _super.call(this) || this;
            _this.resposnes = null;
            _this.responseName = null;
            _this.currentDailogView = null;
            _this.resposnes = responses;
            var bottomBarHeight = "106px";
            _this.navigationBar.title = Survey.SurveyResponse.getLocalizedString("ResponseSummaryTitle");
            if (Survey.SurveyResponse.getSurveyCoverImage() != null) {
                // Adjusting Navigator Bar
                var navigationBarAttribute = {
                    "box-shadow": "none",
                    "background-color": "transparent",
                    "background": "-webkit-linear-gradient(rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.0) 100%)"
                };
                // Module Container
                KASClient.UI.addCSS(_this.moduleContainer.getView(), {
                    "margin-top": "-4pt"
                });
                _this.navigationBar.attributes = navigationBarAttribute;
                var mainText = KASClient.UI.getElement("div", {
                    "color": TEXT_PRIMARY_COLOR,
                    "font-weight": "500",
                    "font-size": KASClient.UI.getScaledFontSize("20px")
                });
                mainText.innerText = _this.navigationBar.title;
                _this.navigationBar.title = mainText.outerHTML;
            }
            _this.navigationBar.backAction = function () {
                if (this.currentDailogView != null) {
                    KASClient.UI.removeElement(this.currentDailogView, document.body);
                    this.currentDailogView = null;
                }
                else {
                    Survey.SurveyResponse.getPageNavigator().goBack();
                }
            }.bind(_this);
            // Footer View
            _this.bottomBar.attributes = {
                "height": bottomBarHeight,
                "align-items": "flex-end",
                "box-shadow": "none",
                "background-color": "transparent",
                "background": "-webkit-linear-gradient(rgba(241,242,244,0) 0%, rgba(241,242,244,1) 50%, rgba(241,242,244,1) 100%)"
            };
            // Module Container
            KASClient.UI.addCSS(_this.moduleContainer.getView(), {
                "margin-bottom": bottomBarHeight
            });
            if (Survey.SurveyResponse.getSurveyCoverImage() != null) {
                // Cover Image
                var coverImageModule = _this.getCoverImageModule();
                _this.moduleContainer.addModuleWithFullWidth(coverImageModule);
                KASClient.UI.addCSS(coverImageModule.getView(), {
                    "margin-bottom": "-88px"
                });
            }
            //Title description view
            _this.moduleContainer.addModule(_this.getTitleDescriptionModule());
            var questionNumberIndex = 1; // question index to display in question module
            for (var i = 0; i < Survey.SurveyResponse.getVisibleQuestions().length; i++) {
                if (Survey.SurveyResponse.getVisibleQuestions()[i].type == KASClient.KASQuestionType.Location) {
                    continue;
                }
                var questionId = Survey.SurveyResponse.getVisibleQuestions()[i].id;
                if (_this.resposnes.hasOwnProperty(String(questionId)))
                    _this.moduleContainer.addModule(new Survey.SurveyResponseSummaryQuestionModule(questionNumberIndex++, i, _this.resposnes[questionId]));
            }
            _this.bottomBar.elements = [_this.getBottomBar()];
            return _this;
        }
        SurveyResponseSummaryFormPage.prototype.getCoverImageModule = function () {
            var coverImageModule = new KASClient.UI.KASFormModule();
            var coverImageView = KASClient.UI.getElement("div", {
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "160px"
            });
            var imgAttributes = {
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "object-fit": "cover"
            };
            var coverImage = KASClient.UI.getElement("img", imgAttributes);
            coverImage.src = Survey.SurveyResponse.getSurveyCoverImage();
            coverImage.onclick = function () {
                KASClient.App.showImageImmersiveView([Survey.SurveyResponse.getSurveyCoverImage()]);
            };
            KASClient.UI.setAccessibilityBasic(coverImage, false, KASClient.UI.KASFormAccessibilityRole.Image, Survey.SurveyResponse.getLocalizedString("CoverImage"));
            KASClient.UI.addElement(coverImage, coverImageView);
            var gradientAttribute = {
                "height": "8px",
                "bottom": "0%",
                "width": "100%",
                "position": "absolute",
                "background-color": "rgba(241,242,244,0)",
                "background": "-webkit-linear-gradient(rgba(241,242,244,0), rgba(241,242,244,1.0))"
            };
            var gradientDiv = KASClient.UI.getElement("div", gradientAttribute);
            KASClient.UI.addElement(gradientDiv, coverImageView);
            coverImageModule.contentView = coverImageView;
            // KASClient.UI.addCSS(coverImageModule.getView(), {
            //     "margin-bottom": "-88px"
            // });
            return coverImageModule;
        };
        SurveyResponseSummaryFormPage.prototype.getTitleDescriptionModule = function () {
            var titleDescriptionModule = new KASClient.UI.KASFormModule();
            var headerText = KASClient.UI.getElement("div", {
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("16px"),
            });
            headerText.innerText = Survey.SurveyResponse.getLocalizedString("AllQuestionRespondedHeader");
            titleDescriptionModule.header = headerText.outerHTML;
            var contentDiv = KASClient.UI.getDiv({});
            var titleDescriptionViewAttribute = {
                "display": "flex",
                "flex-direction": "column",
                "margin-top": "14px",
                "padding": "14px",
                "padding-top": "8px",
                "border-top": "solid 0.5px #d4d8db"
            };
            var titleDescriptionView = KASClient.UI.getElement("div", titleDescriptionViewAttribute);
            var headerLabel = KASClient.UI.getElement("label", {
                "margin-bottom": "0px",
                "width": "100%",
                "color": "#6f7e8f",
                "letter-spacing": "2px",
                "font-size": KASClient.UI.getScaledFontSize("18px")
            });
            headerLabel.innerHTML = Survey.SurveyResponse.getLocalizedString("SurveyDetails");
            KASClient.UI.addElement(headerLabel, titleDescriptionView);
            var surveyTitleLabelAttributes = {
                "margin-bottom": "0px",
                "margin-top": "8px",
                "width": "100%",
                "color": "#32485f",
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "line-height": "18px",
                "text-overflow": "ellipsis",
                "overflow": "hidden",
                "display": "-webkit-box",
                "-webkit-line-clamp": "2",
                "-webkit-box-orient": "vertical"
            };
            var surveyTitleLabel = KASClient.UI.getLabel("", surveyTitleLabelAttributes);
            surveyTitleLabel.innerHTML = Survey.SurveyResponse.getSurvey().title;
            KASClient.UI.addElement(surveyTitleLabel, titleDescriptionView);
            if (Survey.SurveyResponse.getSurveyDescription() != "") {
                var surveyDescriptionLabelAttributes = {
                    "margin-top": "4px",
                    "width": "100%",
                    "color": "#6f7e8f",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "line-height": "12px",
                    "text-overflow": "ellipsis",
                    "overflow": "hidden",
                    "display": "block",
                    "-webkit-line-clamp": "1",
                    "-webkit-box-orient": "vertical"
                };
                var surveyDescriptionLabel = KASClient.UI.getLabel("", surveyDescriptionLabelAttributes);
                surveyDescriptionLabel.innerText = Survey.SurveyResponse.getSurveyDescription();
                KASClient.UI.addElement(surveyDescriptionLabel, titleDescriptionView);
            }
            KASClient.UI.addElement(titleDescriptionView, contentDiv);
            if (Survey.SurveyResponse.getSurvey().isLocationRequested) {
                var locationDivAttributes = {
                    "display": "flex",
                    "flex-direction": "row",
                    "padding": "8px 14px",
                    "border-top": "solid 0.5px #d4d8db",
                    "align-items": "center"
                };
                var locationDiv = KASClient.UI.getDiv(locationDivAttributes);
                KASClient.UI.addElement(locationDiv, titleDescriptionView);
                var locImg = KASClient.UI.getImage("location.png", { "width": "12px", "height": "12px" });
                KASClient.UI.setAccessibilityBasic(locImg, true);
                KASClient.UI.addElement(locImg, locationDiv);
                var locationLabelDiv = KASClient.UI.getDiv({
                    "display": "flex",
                    "flex-direction": "column"
                });
                KASClient.UI.addElement(locationLabelDiv, locationDiv);
                var locLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("ResponseSummaryLocationText"), {
                    "margin-left": "8px",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "color": "#6f7e8f"
                });
                KASClient.UI.addElement(locLabel, locationLabelDiv);
                if (Survey.SurveyResponse.getCustomSettingValue(Survey.SurveyResponse.SHOW_LOCATION_IN_RESPONSE_SUMMARY, false)) {
                    var location = KASClient.UI.getLabel(Survey.SurveyResponse.getLocationAddress(), {
                        "margin-left": "8px",
                        "font-size": KASClient.UI.getScaledFontSize("12px"),
                        "color": "#32485f"
                    });
                    KASClient.UI.addElement(location, locationLabelDiv);
                }
                KASClient.UI.addElement(locationDiv, contentDiv);
            }
            titleDescriptionModule.contentView = contentDiv;
            titleDescriptionModule.attributes = {
                "margin": "16px",
                "border-radius": "4px",
                "box-shadow": "0 1px 1px 0 rgba(0, 0, 0, 0.12)",
                "border": "solid 1px rgba(123, 123, 123, 0.12)"
            };
            return titleDescriptionModule;
        };
        // Bottom Bar
        SurveyResponseSummaryFormPage.prototype.getBottomBar = function () {
            var footerAttributes = {
                "padding-left": "16px",
                "padding-right": "16px",
                "padding-bottom": "16px",
                "background-color": "transparent",
                "width": "100%"
            };
            var footerView = KASClient.UI.getElement("div", footerAttributes);
            var footerButtonAttributes = {
                "width": "100%",
                "padding": "10px",
                "font-size": KASClient.UI.getScaledFontSize("14px"),
                "font-weight": "500",
                "border": "solid 1px rgba(111, 126, 143, 0.5)",
                "border-radius": "2px",
                "-webkit-appearance": "none",
                "background-color": BUTTON_BG_BLUE_COLOR,
                "color": "white"
            };
            footerButtonAttributes = Object.assign(footerButtonAttributes, KASClient.UI.getMediumFontAttributes());
            var footerButton = KASClient.UI.getElement("input", footerButtonAttributes);
            footerButton.type = "button";
            footerButton.value = Survey.SurveyResponse.getLocalizedString("Submit");
            footerButton.onclick = function (event) {
                event.stopPropagation();
                Survey.SurveyResponse.openResponseNameDailogIfNeeded();
            }.bind(this);
            KASClient.UI.setAccessibilityBasic(footerButton, false, KASClient.UI.KASFormAccessibilityRole.Button);
            KASClient.UI.addElement(footerButton, footerView);
            return footerView;
        };
        return SurveyResponseSummaryFormPage;
    }(Survey.SurveyResponseFormPage));
    Survey.SurveyResponseSummaryFormPage = SurveyResponseSummaryFormPage;
})(Survey || (Survey = {}));
/// <reference path="./../../../../../../js/declarations/KASClientCore.d.ts" />
/// <reference path="./../../../../../../js/declarations/KASClientUI.d.ts" />
var Survey;
(function (Survey) {
    var isListOfImageAttachments = KASClient.isListOfImageAttachments;
    var KASImageGridAlbumView = KASClient.UI.KASImageGridAlbumView;
    var AttachmentListResponseType = KASClient.AttachmentListResponseType;
    var SurveyResponseSummaryQuestionModule = /** @class */ (function (_super) {
        __extends(SurveyResponseSummaryQuestionModule, _super);
        function SurveyResponseSummaryQuestionModule(questionNumber, index, response) {
            var _this = _super.call(this) || this;
            _this.question = null;
            _this.response = null;
            _this.index = 0;
            _this.questionNumber = 1;
            _this.questionNumber = questionNumber;
            _this.index = index;
            _this.response = response;
            _this.question = Survey.SurveyResponse.getVisibleQuestions()[index];
            _this.attributes = {
                "margin": "16px",
                "margin-top": "0px",
                "border-radius": "4px",
                "box-shadow": "0 1px 1px 0 rgba(0, 0, 0, 0.12)",
                "border": "solid 1px rgba(123, 123, 123, 0.12)",
                "overflow": "hidden"
            };
            _this.contentView = _this.getContentModuleView();
            return _this;
        }
        SurveyResponseSummaryQuestionModule.prototype.getContentModuleView = function () {
            var contentViewAttribute = {
                "display": "flex",
                "flex-direction": "column",
                "margin": "14px"
            };
            var contentView = KASClient.UI.getElement("div", contentViewAttribute);
            var type = Survey.SurveyResponseQuestionType.getPickerQuestionType(this.question.type, this.question.displayType);
            var questionHeader = KASClient.UI.getElement("div", {
                "color": "#667787",
                "letter-spacing": "2px",
                "font-size": KASClient.UI.getScaledFontSize("12px")
            });
            var questionIconView = KASClient.UI.getElement("img", {
                "width": "12px",
                "height": "12px",
                "margin": "auto",
                "background-color": "transparent",
                "object-fit": "contain"
            });
            questionIconView.src = Survey.SurveyResponseQuestionType.getIcon(type);
            questionHeader.innerHTML = Survey.SurveyResponse.getLocalizedString("QuestionHeader", (this.questionNumber).toLocaleString());
            KASClient.UI.setAccessibilityBasic(questionHeader, false, KASClient.UI.KASFormAccessibilityRole.Text, Survey.SurveyResponse.getLocalizedString("QuestionHeaderText", (this.questionNumber), Survey.SurveyResponseQuestionType.getLocalizedName(type)));
            KASClient.UI.addElement(questionHeader, contentView);
            var questionTitleLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getQuestionTitleForDisplay(this.question), {
                "font-size": KASClient.UI.getScaledFontSize("16px"),
                "color": "#32485f",
                "margin-top": "16px"
            });
            KASClient.UI.addElement(questionTitleLabel, contentView);
            KASClient.UI.addElement(this.getAnswerView(), contentView);
            return contentView;
        };
        SurveyResponseSummaryQuestionModule.prototype.getAnswerView = function () {
            var answerViewAttributes = {
                "margin": "-14px",
                "margin-top": "16px",
                "padding-right": "14px",
                "border-left": 'solid 4px #00a1ff',
                "border-top": "dotted 2px #d8d8d8"
            };
            var anwerView = KASClient.UI.getElement("div", answerViewAttributes);
            // optional question
            if (KASClient.isEmptyObject(this.response) && this.question.isResponseOptional) {
                var notRespondedLabel = KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("NotRespondedTitle"), {
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "padding": "8px",
                    "color": "#5c6a7c"
                });
                KASClient.UI.addElement(notRespondedLabel, anwerView);
                return anwerView;
            }
            if (this.question.type == KASClient.KASQuestionType.Image) {
                KASClient.UI.addElement(KASClient.UI.getLabel(Survey.SurveyResponse.getLocalizedString("YouResponded"), {
                    "color": "#5c6a7c",
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "padding": "8px"
                }), anwerView);
                var resposneImage = KASClient.UI.getImage(this.response, {
                    "width": "56px",
                    "margin": "8px",
                    "margin-top": "0px"
                });
                KASClient.UI.setAccessibilityBasic(resposneImage, false, KASClient.UI.KASFormAccessibilityRole.Image);
                resposneImage.onclick = function () {
                    KASClient.App.showImageImmersiveView([this.response]);
                }.bind(this);
                KASClient.UI.addElement(resposneImage, anwerView);
            }
            else if (this.question.type == KASClient.KASQuestionType.AttachmentList) {
                if (isListOfImageAttachments(JSON.stringify(this.response)) && this.question.config.attachmentListType == AttachmentListResponseType.LIST_OF_IMAGES) {
                    var attachmentsList = this.response;
                    var gridView = new KASImageGridAlbumView("", attachmentsList, true, null, null);
                    var gridContainerView = KASClient.UI.getElement("div", { "padding-bottom": "5px" });
                    KASClient.UI.addElement(gridView.getView(), gridContainerView);
                    KASClient.UI.addElement(gridContainerView, anwerView);
                }
            }
            else {
                var youRespondedLabel = KASClient.UI.getElement("span", { "color": "#5c6a7c" });
                youRespondedLabel.innerText = Survey.SurveyResponse.getLocalizedString("YouResponded");
                var resposneLabel = KASClient.UI.getLabel(youRespondedLabel.outerHTML + " " + this.getResponseText(), {
                    "font-size": KASClient.UI.getScaledFontSize("12px"),
                    "color": "#32485f",
                    "padding": "8px"
                });
                KASClient.UI.addElement(resposneLabel, anwerView);
            }
            return anwerView;
        };
        SurveyResponseSummaryQuestionModule.prototype.getResponseText = function () {
            var responseText = "";
            if (KASClient.isEmptyObject(this.response) && this.question.isResponseOptional)
                return responseText;
            switch (this.question.type) {
                case KASClient.KASQuestionType.SingleSelect:
                    responseText = this.question.options[this.response].text;
                    break;
                case KASClient.KASQuestionType.MultiSelect:
                    for (var i = 0; i < this.response.length; i++) {
                        if (i != 0) {
                            responseText += ", ";
                        }
                        responseText += this.question.options[this.response[i]].text;
                    }
                    break;
                case KASClient.KASQuestionType.Text:
                case KASClient.KASQuestionType.Numeric:
                case KASClient.KASQuestionType.Image:
                    responseText = this.response;
                    break;
                case KASClient.KASQuestionType.DateOnly:
                    try {
                        // The following conversion throws an exception if the date is invalid.
                        // In case of an exception, we will set the given date as is.
                        // If valid, the date will be parsed to the default date string format.
                        new Date(this.response).toISOString();
                        responseText = KASClient.getDateString(new Date(this.response), true, false, true);
                    }
                    catch (e) {
                        responseText = this.response;
                    }
                    break;
                case KASClient.KASQuestionType.PhoneNumber:
                    var phoneNumberResponse = KASClient.KASPhoneNumber.fromJSON(this.response);
                    responseText = phoneNumberResponse.toString();
                    break;
                default:
                    break;
            }
            return responseText;
        };
        return SurveyResponseSummaryQuestionModule;
    }(KASClient.UI.KASFormModule));
    Survey.SurveyResponseSummaryQuestionModule = SurveyResponseSummaryQuestionModule;
})(Survey || (Survey = {}));
/// <reference path="./SurveyResponseQuestionModule.ts" />
var Survey;
(function (Survey) {
    var SurveyResponseTextAnswerModule = /** @class */ (function (_super) {
        __extends(SurveyResponseTextAnswerModule, _super);
        function SurveyResponseTextAnswerModule(index) {
            var _this = _super.call(this, index) || this;
            _this.answerInputView = null;
            _this.inputErrorElement = null;
            return _this;
        }
        SurveyResponseTextAnswerModule.prototype.getSubViews = function () {
            if (this.response == null)
                this.response = "";
            return _super.prototype.getSubViews.call(this).concat([this.getAnswerModule()]);
        };
        SurveyResponseTextAnswerModule.prototype.getAnswerModule = function () {
            var answerViewAttribute = {
                "display": "flex",
                "margin-top": "0px",
                "flex-direction": "column",
                "padding-left": "16px",
                "padding-right": "16px"
            };
            var answerView = KASClient.UI.getElement("div", answerViewAttribute);
            var validationMetaData = this.question ? this.question.valif : null;
            this.answerInputView = new KASClient.UI.KASTextInputView("", this.response, Survey.SurveyResponse.getLocalizedString("SurveyQuestionPlaceHolder"), 24);
            this.answerInputView.inputChangeCallback = function (answerInputView) {
                this.response = this.answerInputView.getInputText();
                this.updateResponse();
            }.bind(this);
            //KASClient.UI.addCSS(this.answerInputView.getView(), {"padding-left": "16px",
            //                                      "padding-right": "16px"});
            var helpText = "", errorString = "";
            if (this.question.valif != null) {
                errorString = this.getValidationErrorString();
                helpText = this.getHelpTextString();
            }
            this.inputErrorElement = _super.prototype.getInputErrorElement.call(this, errorString, helpText);
            KASClient.UI.addCSS(this.inputErrorElement, { "padding-left": "0px",
                "padding-right": "0px" });
            this.answerInputView.onFocusCallback = function (answerInputView) {
                this.toggleInputErrorText(this.inputErrorElement, false);
            }.bind(this);
            this.answerInputView.onBlurCallback = function () {
                var validity;
                if (KASClient.isEmptyObject(this.response))
                    validity = this.question.isResponseOptional;
                else
                    validity = this.validateField(this.response, this.inputErrorElement);
                if (validity) {
                    KASClient.UI.addCSS(this.answerInputView.inputView, { "border-bottom": "solid 1.5px #00a1ff" });
                }
                else {
                    KASClient.UI.addCSS(this.answerInputView.inputView, { "border-bottom": "solid 2px #de2d4f" });
                    this.delegate.clearAnswer(this.question.id);
                }
                this.delegate.updateFormValidity(this.question.id, validity);
            }.bind(this);
            KASClient.UI.addElement(this.answerInputView.getView(), answerView);
            KASClient.UI.addElement(this.inputErrorElement, answerView);
            this.toggleInputErrorText(this.inputErrorElement, false);
            return answerView;
        };
        SurveyResponseTextAnswerModule.prototype.updateResponse = function () {
            if (!this.isValid()) {
                this.delegate.clearAnswer(this.question.id);
            }
            else {
                this.delegate.setAnswer(this.question.id, this.response);
            }
        };
        SurveyResponseTextAnswerModule.prototype.setFocus = function () {
            KASClient.App.isTalkBackEnabledAsync(function (talkBackEnabled) {
                if (!talkBackEnabled) {
                    setTimeout(function () {
                        this.answerInputView.setFocus(true);
                    }.bind(this), 100);
                }
            }.bind(this));
        };
        SurveyResponseTextAnswerModule.prototype.isValid = function () {
            return true;
        };
        SurveyResponseTextAnswerModule.prototype.getValidationErrorString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.errorString, this.question.valif.attributes.minValue, this.question.valif.attributes.maxValue);
        };
        SurveyResponseTextAnswerModule.prototype.getHelpTextString = function () {
            return Survey.SurveyResponse.getLocalizedString(this.question.valif.helpText, this.question.valif.attributes.minValue, this.question.valif.attributes.maxValue);
        };
        SurveyResponseTextAnswerModule.prototype.resetQuestionResponseUI = function () {
            this.answerInputView.setInputText("");
            this.response = "";
            this.updateResponse();
            this.answerInputView.setCSSAttribute("border-bottom", "solid .5px #d4d8db");
            this.toggleInputErrorText(this.inputErrorElement, false);
        };
        return SurveyResponseTextAnswerModule;
    }(Survey.SurveyResponseQuestionModule));
    Survey.SurveyResponseTextAnswerModule = SurveyResponseTextAnswerModule;
})(Survey || (Survey = {}));
