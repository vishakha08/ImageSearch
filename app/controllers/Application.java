package controllers;

import play.mvc.*;

import cn.bran.play.JapidController;


public class Application extends JapidController {

    public static Result index() {
        return renderJapid();
    }

}
