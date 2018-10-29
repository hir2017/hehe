$.getScript = function(url, options) {

    var script = document.createElement('script'),
        isFunction = $.isFunction(options),
        timer;

    // 清除定时器
    function clearTimer() {
        if (timer) {
            clearTimeout(timer);
            timer = null;
        }
    }

    // success
    if (isFunction || (options && options.success)) {
        script.onload = function() {
            clearTimer();
            isFunction ? options() : options.success.call(options.context);
        };
    }

    if (!isFunction && options) {
        // failure
        if (options.error) {
            script.onerror = function() {
                clearTimer();
                options.error.call(options.context);
            }
        }
        // timeout
        if (options.timeout) {
            timer = setTimeout(function() {
                timer = null;
                if (options.error) {
                    options.error.call(options.context);
                }
            }, options.timeout);
        }
    }

    script.setAttribute('data-path', url);

    script.src = url;

    return document.body.appendChild(script);

};