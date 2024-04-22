# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin_all_from "app/javascript/components", under: "components"

pin "react" # @18.2.0
pin "htm" # @3.1.1
pin "react-dom" # @18.2.0
pin "scheduler" # @0.23.0
pin "@babel/runtime/helpers/esm/assertThisInitialized", to: "@babel--runtime--helpers--esm--assertThisInitialized.js" # @7.24.4
pin "@babel/runtime/helpers/esm/classCallCheck", to: "@babel--runtime--helpers--esm--classCallCheck.js" # @7.24.4
pin "@babel/runtime/helpers/esm/createClass", to: "@babel--runtime--helpers--esm--createClass.js" # @7.24.4
pin "@babel/runtime/helpers/esm/createForOfIteratorHelper", to: "@babel--runtime--helpers--esm--createForOfIteratorHelper.js" # @7.24.4
pin "@babel/runtime/helpers/esm/createSuper", to: "@babel--runtime--helpers--esm--createSuper.js" # @7.24.4
pin "@babel/runtime/helpers/esm/defineProperty", to: "@babel--runtime--helpers--esm--defineProperty.js" # @7.24.4
pin "@babel/runtime/helpers/esm/inherits", to: "@babel--runtime--helpers--esm--inherits.js" # @7.24.4
pin "@babel/runtime/helpers/esm/typeof", to: "@babel--runtime--helpers--esm--typeof.js" # @7.24.4
pin "css-vars-ponyfill" # @2.4.9
pin "date-fns" # @2.30.0
pin "dompurify" # @3.1.0

pin "@sendbird/uikit-react", to: "@sendbird--uikit-react.js" # @3.14.2
pin "@sendbird/chat", to: "@sendbird--chat.js" # @4.12.3
pin "@sendbird/chat/groupChannel", to: "@sendbird--chat--groupChannel.js" # @4.12.3
pin "@sendbird/chat/message", to: "@sendbird--chat--message.js" # @4.12.3
pin "@sendbird/chat/openChannel", to: "@sendbird--chat--openChannel.js" # @4.12.3
pin "@sendbird/uikit-tools", to: "@sendbird--uikit-tools.js" # @0.0.1
