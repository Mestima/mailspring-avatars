"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.serialize = exports.activate = void 0;
const mailspring_exports_1 = require("mailspring-exports");
const avatar_factory_1 = __importDefault(require("./avatar-factory"));
const SmallAvatar = (0, avatar_factory_1.default)(20, 'SmallAvatar');
const LargeAvatar = (0, avatar_factory_1.default)(30, 'LargeAvatar');
// Activate is called when the package is loaded. If your package previously
// saved state using `serialize` it is provided.
//
function activate() {
    mailspring_exports_1.ComponentRegistry.register(SmallAvatar, { role: 'ThreadListIcon' });
    // See `thread-list-columns.cjsx#L132` -> In Narrow mode, Icons are limited to 1 because of UI issue. Hack around and use MailLabel for larger size
    mailspring_exports_1.ComponentRegistry.register(LargeAvatar, { role: 'Thread:MailLabel' });
}
exports.activate = activate;
// Serialize is called when your package is about to be unmounted.
// You can return a state object that will be passed back to your package
// when it is re-activated.
//
function serialize() {
}
exports.serialize = serialize;
// This **optional** method is called when the window is shutting down,
// or when your package is being updated or disabled. If your package is
// watching any files, holding external resources, providing commands or
// subscribing to events, release them here.
//
function deactivate() {
    mailspring_exports_1.ComponentRegistry.unregister(SmallAvatar);
    // ComponentRegistry.unregister(LargeAvatar)
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDJEQUF1RDtBQUN2RCxzRUFBNkM7QUFFN0MsTUFBTSxXQUFXLEdBQUcsSUFBQSx3QkFBYSxFQUFDLEVBQUUsRUFBQyxhQUFhLENBQUMsQ0FBQztBQUNwRCxNQUFNLFdBQVcsR0FBRyxJQUFBLHdCQUFhLEVBQUMsRUFBRSxFQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXBELDRFQUE0RTtBQUM1RSxnREFBZ0Q7QUFDaEQsRUFBRTtBQUNGLFNBQWdCLFFBQVE7SUFDdEIsc0NBQWlCLENBQUMsUUFBUSxDQUFFLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBQyxDQUFDLENBQUM7SUFDbkUsbUpBQW1KO0lBQ25KLHNDQUFpQixDQUFDLFFBQVEsQ0FBRSxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO0FBQ3ZFLENBQUM7QUFKRCw0QkFJQztBQUVELGtFQUFrRTtBQUNsRSx5RUFBeUU7QUFDekUsMkJBQTJCO0FBQzNCLEVBQUU7QUFDRixTQUFnQixTQUFTO0FBQ3pCLENBQUM7QUFERCw4QkFDQztBQUVELHVFQUF1RTtBQUN2RSx3RUFBd0U7QUFDeEUsd0VBQXdFO0FBQ3hFLDRDQUE0QztBQUM1QyxFQUFFO0FBQ0YsU0FBZ0IsVUFBVTtJQUN4QixzQ0FBaUIsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUE7SUFDekMsNENBQTRDO0FBQzlDLENBQUM7QUFIRCxnQ0FHQyJ9