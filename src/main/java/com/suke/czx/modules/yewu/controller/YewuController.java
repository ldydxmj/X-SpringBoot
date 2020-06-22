package com.suke.czx.modules.yewu.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.suke.czx.common.annotation.SysLog;
import com.suke.czx.common.base.AbstractController;
import com.suke.czx.common.utils.R;
import com.suke.czx.modules.yewu.entity.Yewu;
import com.suke.czx.modules.yewu.service.YewuService;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Date;
import java.util.Map;


/**
 * APK版本管理
 * 
 * @author czx
 * @email object_czx@163.com
 * @date 2019-04-28 15:56:33
 */
@RestController
@AllArgsConstructor
@RequestMapping("/yewu/yewu")
public class YewuController extends AbstractController {
    private final YewuService yewuService;

    /**
     * 列表
     */
    @RequestMapping("/list")
    @PreAuthorize("hasRole('yewu:yewu:list')")
    public R list(@RequestParam Map<String, Object> params){
        //查询列表数据
        QueryWrapper<Yewu> queryWrapper = new QueryWrapper<>();
        IPage<Yewu> sysConfigList = yewuService.page(mpPageConvert.<Yewu>pageParamConvert(params),queryWrapper);
        return R.ok().put("page", mpPageConvert.pageValueConvert(sysConfigList));
    }


    /**
     * 信息
     */
    @RequestMapping("/info/{id}")
    @PreAuthorize("hasRole('yewu:yewu:info')")
    public R info(@PathVariable("id") Long id){
        return R.ok().put("yewu", yewuService.getById(id));
    }


    /**
     * 新增yewu数据
     */
    @SysLog("新增业务数据")
    @RequestMapping("/save")
    @PreAuthorize("hasRole('yewu:yewu:save')")
    public R save(@RequestBody Yewu yewu){
        yewu.setUserId(getUserId());
        yewuService.save(yewu);
        return R.ok();
    }


    /**
     * 修改
     */
    @SysLog("修改yewu数据")
    @RequestMapping("/update")
    @PreAuthorize("hasRole('yewu:yewu:update')")
    public R update(@RequestBody Yewu yewu){
        yewu.setUpdateTime(new Date());
		yewuService.updateById(yewu);
        return R.ok();
    }


    /**
     * 删除
     */
    @SysLog("删除业务数据")
    @RequestMapping("/delete")
    @PreAuthorize("hasRole('yewu:yewu:delete')")
    public R delete(@RequestBody Long[] ids){
		yewuService.removeByIds(Arrays.asList(ids));
        return R.ok();
    }
	
}
