/*Adapted from https://github.com/sitebase/react-avatar */
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailspring_exports_1 = require("mailspring-exports");
const prop_types_1 = __importDefault(require("prop-types"));
const create_react_class_1 = __importDefault(require("create-react-class"));
const md5_1 = __importDefault(require("md5"));
const isRetina = require('is-retina')();
const AvatarImage = (0, create_react_class_1.default)({
    displayName: 'AvatarImage',
    getProtocol: function () {
        if (typeof window === 'undefined')
            return 'https:';
        return window.location.protocol;
    },
    shouldComponentUpdate(nextProps, nextState) {
        return !mailspring_exports_1.Utils.isEqualReact(nextProps, this.props) || !mailspring_exports_1.Utils.isEqualReact(nextState, this.state);
    },
    /**
     * Gravatar implementation
     * @param  {string}   email MD5 hash or plain text email address
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGravatarURL: function (email, size, cb, tryNext) {
        var base = 'gravatar.com/avatar/<%=id%>?s=<%=size%>&d=404';
        // if email does not contain @ it's already an MD5 hash
        if (email.indexOf('@') > -1)
            email = (0, md5_1.default)(email);
        var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
        size = isRetina ? size * 2 : size;
        cb(prefix + this.parse(base, { id: email, size: size }));
    },
    getClearbitURL: function (email, size, cb, tryNext) {
        var base = "logo.clearbit.com/<%=domain%>";
        var domain;
        if (email.indexOf('@') > -1)
            domain = email.split('@')[1];
        var prefix = this.getProtocol() === 'https:' ? 'https://secure.' : 'http://';
        cb(prefix + this.parse(base, { domain: domain }));
    },
    /**
     * Facebook implementation
     * @param  {string|int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getFacebookURL: function (id, size, cb, tryNext) {
        var base = 'graph.facebook.com/<%=id%>/picture?width=<%=size%>';
        cb(this.getProtocol() + '//' + this.parse(base, { id: id, size: size }));
    },
    /**
     * Google+ implementation
     * @param  {int}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getGoogleURL: function (id, size, cb, tryNext) {
        var base = 'picasaweb.google.com/data/entry/api/user/<%=id%>?alt=json';
        var url = this.getProtocol() + '//' + this.parse(base, { id: id });
        this.get(url, function (data) {
            var src = data.entry.gphoto$thumbnail.$t.replace('s64', 's' + size); // replace with the correct size
            cb(src);
        }, tryNext);
    },
    /**
     * Skype implementation
     * @param  {string}   id
     * @param  {int}   size
     * @param  {Function} cb
     * @return {void}
     */
    getSkypeURL: function (id, size, cb, tryNext) {
        var base = 'api.skype.com/users/<%=id%>/profile/avatar';
        cb(this.getProtocol() + '//' + this.parse(base, { id: id }));
    },
    /**
     * Replace variables in a string
     * @param  {string} value String that will be parsed
     * @param  {Object} variables    Key value object
     * @return {string}
     */
    parse: function (value, variables) {
        for (var variable in variables) {
            value = value.replace('<%=' + variable + '%>', variables[variable]);
        }
        return value;
    },
    /**
     * Return a random color
     * @return {string}
     */
    rndColor: function () {
        var colors = ['#d73d32', '#7e3794', '#4285f4', '#67ae3f', '#d61a7f', '#ff4080'];
        var index = Math.floor(Math.random() * colors.length);
        return colors[index];
    },
    /**
     * Convert a name into initials
     * @param {string} name
     * @return {string}
     */
    getInitials: function (name) {
        var parts = name.split(' ');
        var initials = '';
        for (var i = 0; i < parts.length; i++) {
            initials += parts[i].substr(0, 1).toUpperCase();
        }
        return initials;
    },
    /**
     * Do an ajax request to fetch remote data
     * @param  {string}   url
     * @param  {Function} cb
     * @return {void}
     */
    get: function (url, successCb, errorCb) {
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status === 200) {
                    var data = JSON.parse(request.responseText);
                    successCb(data);
                }
                else {
                    errorCb(request.status);
                }
            }
        };
        request.open('GET', url, true);
        request.send();
    },
    /**
     * Set the src attribute of the image element use to display the avatar
     * @param {string} src
     */
    setSrc: function (src) {
        if (src === null)
            return;
        this.trySetState({ src: src });
    },
    propTypes: {
        className: prop_types_1.default.string,
        fgColor: prop_types_1.default.string,
        color: prop_types_1.default.string,
        name: prop_types_1.default.string,
        value: prop_types_1.default.string,
        email: prop_types_1.default.string,
        facebookId: prop_types_1.default.string,
        googleId: prop_types_1.default.string,
        skypeID: prop_types_1.default.string,
        round: prop_types_1.default.bool,
        size: prop_types_1.default.number
    },
    getInitialState: function () {
        return {
            src: null,
            value: null,
            triedFacebook: false,
            triedGoogle: false,
            triedSkype: false,
            triedGravatar: false,
            triedClearbit: false,
        };
    },
    getDefaultProps: function () {
        return {
            fgColor: '#FFF',
            color: null,
            name: null,
            value: null,
            email: null,
            facebookId: null,
            skypeId: null,
            googleId: null,
            round: false,
            size: 32
        };
    },
    // componentWillMount: function() {
    //   this.fetch();
    // },
    componentDidMount: function () {
        this.fetch();
    },
    componentWillReceiveProps: function (newProps) {
        /**
         * This component ignores changes in `this.props.src`, `this.props.name`, and
         * `this.props.value`. This lifecycle method will allow users to change the avatars name or
         * value.
         */
        if (newProps.src && newProps.src !== this.props.src) {
            this.trySetState({ src: newProps.src });
        }
        else if (newProps.name && newProps.name !== this.props.name) {
            this.trySetState({ value: this.getInitials(newProps.name) });
        }
        else if (newProps.value && newProps.value !== this.props.value) {
            this.trySetState({ value: newProps.value });
        }
    },
    trySetState: function (hash) {
        if (this.isMounted()) { //bad antipattern
            this.setState(hash);
        }
    },
    fetch: function (e) {
        var url = null;
        var self = this;
        var tryNext = function () {
            self.fetch();
        };
        // If fetch was triggered by img onError
        // then set state src back to null so getVisual will
        // automatically switch to drawn avatar if there is no other social ID available to try
        if (e && e.type === "error") {
            this.state.src = null;
        }
        if (this.state.triedFacebook === false && !this.state.url && this.props.facebookId) {
            this.state.triedFacebook = true;
            this.getFacebookURL(this.props.facebookId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedGoogle === false && !this.state.url && this.props.googleId) {
            this.state.triedGoogle = true;
            this.getGoogleURL(this.props.googleId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedSkype === false && !this.state.url && this.props.skypeId) {
            this.state.triedSkype = true;
            this.getSkypeURL(this.props.skypeId, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedGravatar === false && !this.state.url && this.props.email) {
            this.state.triedGravatar = true;
            this.getGravatarURL(this.props.email, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.triedClearbit === false && !this.state.url && this.props.email) {
            this.state.triedClearbit = true;
            this.getClearbitURL(this.props.email, this.props.size, this.setSrc, tryNext);
            return;
        }
        if (this.state.src)
            return;
        if (this.props.name)
            this.trySetState({ value: this.getInitials(this.props.name) });
        if (!this.props.name && this.props.value)
            this.trySetState({ value: this.props.value });
        if (url === null && this.props.src) {
            this.setSrc(this.parse(this.props.src, { size: this.props.size }));
            return;
        }
    },
    getVisual: function () {
        var imageStyle = {
            maxWidth: '100%',
            width: this.props.size,
            height: this.props.size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        var initialsStyle = {
            background: this.props.color || this.rndColor(),
            width: this.props.size,
            height: this.props.size,
            font: Math.floor(this.props.size / 3) + 'px/100px',
            color: this.props.fgColor,
            textAlign: 'center',
            textTransform: 'uppercase',
            lineHeight: (this.props.size + Math.floor(this.props.size / 10)) + 'px',
            borderRadius: (this.props.round ? 500 : 0)
        };
        if (this.state.src) {
            return (
            /* jshint ignore:start */
            mailspring_exports_1.React.createElement("img", { width: this.props.size, height: this.props.size, style: imageStyle, src: this.state.src, onError: this.fetch })
            /* jshint ignore:end */
            );
        }
        else {
            return (
            /* jshint ignore:start */
            mailspring_exports_1.React.createElement("div", { style: initialsStyle }, this.state.value)
            /* jshint ignore:end */
            );
        }
    },
    render: function () {
        var hostStyle = {
            display: 'inline-block',
            width: this.props.size,
            height: this.props.size,
            borderRadius: (this.props.round ? 500 : 0)
        };
        var visual = this.getVisual();
        return (
        /* jshint ignore:start */
        mailspring_exports_1.React.createElement("div", { className: this.props.className, style: hostStyle }, visual)
        /* jshint ignore:end */
        );
    }
});
module.exports = AvatarImage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLWltYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2F2YXRhci1pbWFnZS5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMERBQTBEO0FBRTFELFlBQVksQ0FBQzs7Ozs7QUFDYiwyREFBZ0Q7QUFDaEQsNERBQW1DO0FBQ25DLDRFQUFrRDtBQUNsRCw4Q0FBc0I7QUFDdEIsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUM7QUFFeEMsTUFBTSxXQUFXLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQztJQUNqQyxXQUFXLEVBQUUsYUFBYTtJQUMxQixXQUFXLEVBQUU7UUFFVCxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVc7WUFDN0IsT0FBTyxRQUFRLENBQUM7UUFFcEIsT0FBTyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQztJQUNwQyxDQUFDO0lBRUQscUJBQXFCLENBQUMsU0FBUyxFQUFFLFNBQVM7UUFDdEMsT0FBTyxDQUFDLDBCQUFLLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQywwQkFBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxjQUFjLEVBQUUsVUFBUyxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxPQUFPO1FBRTdDLElBQUksSUFBSSxHQUFHLCtDQUErQyxDQUFDO1FBRTNELHVEQUF1RDtRQUN2RCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZCLEtBQUssR0FBRyxJQUFBLGFBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQztRQUV2QixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxD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