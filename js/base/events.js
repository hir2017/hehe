/**
 * Event center
 */
(function(global, factory) {

    // amd mode
    if (typeof define === 'function' && define["amd"]) {
        define(factory);
    } else if (typeof require === 'function' && typeof module === "object" && module && module["exports"]) {
        // commonjs mode
        module.exports = factory();
    } else {
        // global mode
        global.events = factory();
    }

})(window, function() {
    
    var Callbacks = function (options) {
        options = $.extend({}, options);

        var memory, // Last fire value (for non-forgettable lists)
            fired, // Flag to know if list was already fired
            firing, // Flag to know if list is currently firing
            firingStart, // First callback to fire (used internally by add and fireWith)
            firingLength, // End of the loop when firing
            firingIndex, // Index of currently firing callback (modified by remove if needed)
            list = [], // Actual callback list
            stack = !options.once && [], // Stack of fire calls for repeatable lists
            fire = function (data) {
                memory = options.memory && data
                fired = true
                firingIndex = firingStart || 0
                firingStart = 0
                firingLength = list.length
                firing = true
                for (; list && firingIndex < firingLength; ++firingIndex) {
                    if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
                        memory = false
                        break
                    }
                }
                firing = false
                if (list) {
                    if (stack) stack.length && fire(stack.shift())
                    else if (memory) list.length = 0
                    else Callbacks.disable()
                }
            },

            Callbacks = {
                list: list,
                add: function () {
                    if (list) {
                        var start = list.length,
                            add = function (args) {
                                args = Array.prototype.slice.call(args);
                                args.forEach(function (arg, _) {
                                    if (typeof arg === "function") {
                                        if (!options.unique || !Callbacks.has(arg)) list.push(arg)
                                    } else if (arg && arg.length && typeof arg !== 'string') add(arg)
                                })
                            }
                        add(arguments)
                        if (firing) firingLength = list.length
                        else if (memory) {
                            firingStart = start
                            fire(memory)
                        }
                    }
                    return this
                },
                remove: function () {
                    var args = Array.prototype.slice.call(arguments);
                    if (list) {
                        args.forEach(function (arg, _) {
                            var index
                            while ((index = list.indexOf(arg, index)) > -1) {
                                list.splice(index, 1)
                                // Handle firing indexes
                                if (firing) {
                                    if (index <= firingLength)--firingLength
                                    if (index <= firingIndex)--firingIndex
                                }
                            }
                        })
                    }
                    return this
                },
                has: function (fn) {
                    return !!(list && (fn ? list.indexOf(fn) > -1 : list.length))
                },
                empty: function () {
                    firingLength = list.length = 0
                    return this
                },
                disable: function () {
                    list = stack = memory = undefined
                    return this
                },
                disabled: function () {
                    return !list
                },
                lock: function () {
                    stack = undefined;
                    if (!memory) Callbacks.disable()
                    return this
                },
                locked: function () {
                    return !stack
                },
                fireWith: function (context, args) {
                    if (list && (!fired || stack)) {
                        args = args || []
                        args = [context, args.slice ? args.slice() : args]
                        if (firing) stack.push(args)
                        else fire(args)
                    }
                    return this
                },
                fire: function () {
                    return Callbacks.fireWith(this, arguments)
                },
                fired: function () {
                    return !!fired
                }
            }

        return Callbacks
    };
    var channelObj = {};

    // 统一事件机制
    var Events = {
        Event: Callbacks,
        /**
         * 添加事件监听
         * @param  {string}   name - 事件名称
         * @param  {function} callback - 事件回调
         */
        on: function (name, callback) {
            var obj,
                that = this;

            this.events = this.events || {};

            // 逗号隔开，支持多事件
            if (name && name.indexOf(',') != -1) {
                return (name.split(',') || []).forEach(function (item) {
                    if (item) {
                        that.on(item, callback);
                    }
                });
            }

            if (!this.global && name.indexOf('/') != -1) {
                // 频道监听
                if (name.split('/')[0] == 'channel') {
                    return that.channel.on(name.replace(/^channel\//gi, ''), callback);
                }

                obj = getObjectByNames(name, this);
                this.events[name] = this.events[name] || [];
                this.events[name].push(callback);
                return obj ? obj.on(getEventName(name), callback) : this;
            } else {
                obj = this.events[name] || (this.events[name] = this.Event());
            }

            // 如果设置为一起派发，则再次监听时，直接执行
            if (this._alwayEmitSource && this._alwayEmitSource[name]) {
                return callback.apply(name, this._alwayEmitSource[name]);
            }
            obj.add(callback);

            return this;
        },
        /**
         * 移除事件监听
         * @param  {string}   name     事件名称
         * @param  {function} [callback] - 事件回调，为空时，移除所有回调
         */
        off: function (name, callback) {
            var obj,
                funs,
                that = this;

            this.events = this.events || {};

            // 逗号隔开，支持多事件
            if (name && name.indexOf(',') != -1) {
                return (name.split(',') || []).forEach(function (item) {
                    if (item) {
                        that.off(item, callback);
                    }
                });
            }

            if (!this.global && name && name.indexOf('/') != -1) {
                if (name.split('/')[0] == 'channel') {
                    return that.channel.off(name.replace(/^channel\//gi, ''), callback);
                }

                if (this.events[name]) {
                    obj = getObjectByNames(name, this);
                    if (callback) {
                        return obj ? obj.off(getEventName(name), callback) : this;
                    } else {
                        funs = this.events[name];
                        for (var i = 0; obj && funs && i < funs.length; i++) {
                            obj.off(getEventName(name), funs[i]);
                        }
                        this.events[name] = null;
                    }
                }

                return this;
            }

            if (name && callback && (obj = this.events[name])) {
                obj.remove(callback);
            } else if (name && (obj = this.events[name])) {
                obj.empty();
            } else {
                
                for (name in this.events) {
                    if (this.events.hasOwnProperty(name) && this.events[name]) {
                        if (!this.global && name.indexOf('/') != -1) {
                            if (name.split('/')[0] == 'channel') {
                                return this.channel.off(name.replace(/^channel\//gi, ''));
                            }
                            this.off(name);
                        } else {
                            this.events[name].empty();
                        }
                    }
                }
            }

            return this;
        },
        ///**
        // * 只监听一次事件
        // * @param name
        // * @param callback
        // */
        //once: function (name, callback) {
        //    var _callback;
        //
        //    this.on(name, _callback = function () {
        //        callback.apply(this, arguments);
        //        this.off(name, _callback);
        //    });
        //},
        /**
         * 默认派发事件
         * @return {object}
         */
        trigger: function () {
            var name = arguments[0],
                obj,
                param,
                that = this;

            this.events = this.events || {};
            param = Array.prototype.slice.call(arguments, 1);

            // 逗号隔开，支持多事件
            if (name && name.indexOf(',') != -1) {
                return (name.split(',') || []).forEach(function (item) {
                    if (item) {
                        that.trigger.apply(this, [item].concat(param));
                    }
                });
            }

            if (!this.global && name && name.indexOf('/') != -1) {
                if (name.split('/')[0] == 'channel') {
                    return that.channel.trigger.apply(that.channel, [name.replace(/^channel\//gi, '')].concat(param));
                }
                obj = getObjectByNames(name, this);
                name = getEventName(name);
                return obj ? obj.trigger.apply(obj, [name].concat(param)) : this;
            }

            if (name && (obj = this.events[name])) {
                obj.fire.apply(this, [].concat(param));
            }

            return {
                event: obj,
                always: function () {
                    that._alwayEmitSource = that._alwayEmitSource || {};
                    that._alwayEmitSource[name] = [].concat(param);
                }
            };
        },
        /**
         * 派发事件
         * @example
         *        this.emit('ready',args0,args1...);
         */
        emit: function () {
            return this.trigger.apply(this, arguments);
        }
    };

    /**
     * 获取context下的name属性
     * @private
     */
    function getObjectByNames(name, context) {
        var that,
            names,
            len;

        context = context || {};
        that = context;
        names = name.split('/');
        len = names.length;

        for (var i = 0; len > 1 && i < len - 1; i++) {
            if (that && that[names[i]]) {
                that = that[names[i]];
            } else {
                that = null;
            }
        }

        return that;
    }

    /**
     * 获取事件名称
     * @param  {String} name [description]
     * @return {String}
     */
    function getEventName(name) {
        var names = name.split('/');
        return names[names.length - 1];
    }

    // global single Event
    Events.channel = $.channel || ($.channel = $.extend(channelObj, Events));
    Events.channel.global = Events.channel;

    return Events;

});