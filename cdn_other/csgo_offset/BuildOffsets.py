import re
import os
import shutil
import time

offsets = [
        {"index": 0, "val_row": 4, "name": "本地人物控制器",                 "key": "client_dll.dwLocalPlayerController"},
        {"index": 0, "val_row": 6, "name": "本地人物",                      "key": "client_dll.dwLocalPlayerPawn"},
        {"index": 0, "val_row": 8, "name": "实体列表",                      "key": "client_dll.dwEntityList"},
        {"index": 0, "val_row": 10, "name": "本地人物朝向",                  "key": "client_dll.dwViewAngles"},
        {"index": 0, "val_row": 12, "name": "本地人物视觉矩阵(用于制作ESP)",    "key": "client_dll.dwViewMatrix"},
        {"index": 0, "val_row": 14, "name": "人物地址",                     "key": "CCSPlayerController.m_hPlayerPawn"},
        {"index": 0, "val_row": 16, "name": "队伍偏移",                     "key": "C_BaseEntity.m_iTeamNum"},
        {"index": 0, "val_row": 18, "name": "护甲偏移",                     "key": "C_CSPlayerPawn.m_ArmorValue"},
        {"index": 0, "val_row": 20, "name": "血量偏移",                     "key": "C_BaseEntity.m_iHealth"},
        {"index": 0, "val_row": 22, "name": "瞄准目标id偏移",                "key": "C_CSPlayerPawnBase.m_iIDEntIndex"},
        {"index": 1, "val_row": 24, "name": "人物状态 (跳跃,蹲下等动作)",      "key": "C_BaseEntity.m_fFlags"},
        {"index": 0, "val_row": 26, "name": "子弹数量",                     "key": "C_CSPlayerPawn.m_iShotsFired"},
        {"index": 0, "val_row": 28, "name": "人物移动速度",                  "key": "C_BaseEntity.m_vecVelocity"},
        {"index": 0, "val_row": 30, "name": "判断墙体: m_bSpotted = (C_CSPlayerPawn.m_entitySpottedState + EntitySpottedState_t.m_bSpotted) // ",  "key": "m_bSpotted"},
        {"index": 0, "val_row": 32, "name": "人物狙击枪开镜",                "key": "C_CSPlayerPawn.m_bIsScoped"},
        {"index": 0, "val_row": 34, "name": "人物手持武器",                 "key": "C_CSPlayerPawnBase.m_pClippingWeapon"},
        {"index": 0, "val_row": 36, "name": "人物世界坐标",                 "key": "C_BaseEntity.m_pGameSceneNode"},
        {"index": 1, "val_row": 38, "name": "人物世界坐标",                "key": "CGameSceneNode.m_vecOrigin"},
        {"index": 0, "val_row": 40, "name": "人物手持武器后坐力",            "key": "C_CSPlayerPawn.m_aimPunchCache"},
        {"index": 0, "val_row": 42, "name": "人物朝向偏移",                "key": "C_BaseModelEntity.m_vecViewOffset"},
        {"index": 0, "val_row": 44, "name": "人物骨骼坐标: m_dwBoneMatrix = CSkeletonInstance.m_modelState + 0x80 // ",      "key": "m_dwBoneMatrix"},  # +0x80
        {"index": 0, "val_row": 46, "name": "本地人物名称",                "key": "CBasePlayerController.m_iszPlayerName"},
        {"index": 1, "val_row": 48, "name": "回合伤害和击杀数",             "key": "CCSPlayerController.m_pActionTrackingServices"},
        {"index": 0, "val_row": 50, "name": "回合伤害和击杀数",             "key": "CCSPlayerController_ActionTrackingServices.m_iNumRoundKills"},
        {"index": 0, "val_row": 52, "name": "回合伤害和击杀数",             "key": "CCSPlayerController_ActionTrackingServices.m_unTotalRoundDamageDealt"},
        {"index": 0, "val_row": 54, "name": "武器类型: m_iItemDefinitionIndex = (C_EconEntity.m_AttributeManager + C_AttributeContainer.m_Item + C_EconItemView.m_iItemDefinitionIndex) //",                   "key": "m_iItemDefinitionIndex"},
        {"index": 0, "val_row": 56, "name": "人物朝向角度",               "key": "C_CSPlayerPawnBase.m_angEyeAngles"},
    ]


def add16Hex(hex_num1, hex_num2):
    # 将16进制数转换为10进制数
    num1 = int(hex_num1, 16)
    num2 = int(hex_num2, 16)
    # 相加得到结果
    result = num1 + num2
    # 将结果转换回16进制数
    return hex(result).upper().replace("0X", "0x")


def handle_lines(namespace_map, lines):
    namespace = ''
    for line in lines:
        line = line.strip()
        # 命名空间
        match_namespace = re.search(r'(?<=namespace\s).+?(?=\s\{)', line)
        if match_namespace:
            namespace = match_namespace.group()
        # 键值
        match_key = re.search(r'(?<=\s)\w+?(?=\s=)', line)
        if namespace and match_key:
            key = match_key.group()
            match_value = re.search(r'(?<= ' + key + r'\s=\s).+?(?=;)', line)
            if match_value:
                value = match_value.group()
                namespace_map[namespace + "." + key] = value


def build_key_value():
    # 获得键值列表
    namespace_map = {}
    with open('output/offsets.hpp', 'r') as file:
        lines = file.readlines()
        handle_lines(namespace_map, lines)
    with open('output/client_dll.hpp', 'r') as file:
        lines = file.readlines()
        handle_lines(namespace_map, lines)
    return namespace_map



def create_ofset(file):
    nm = build_key_value()
    # 特殊处理 m_iItemDefinitionIndex = (C_EconEntity.m_AttributeManager + C_AttributeContainer.m_Item + C_EconItemView.m_iItemDefinitionIndex)
    nm['m_iItemDefinitionIndex'] = add16Hex(
        add16Hex(nm['C_EconEntity.m_AttributeManager'], nm['C_AttributeContainer.m_Item']),
        nm['C_EconItemView.m_iItemDefinitionIndex'])
    # 特殊处理 m_bSpotted = (C_CSPlayerPawn.m_entitySpottedState + EntitySpottedState.m_bSpotted)
    nm['m_bSpotted'] = add16Hex(nm['C_CSPlayerPawn.m_entitySpottedState'], nm['EntitySpottedState_t.m_bSpotted'])
    # 特殊处理 m_dwBoneMatrix = CSkeletonInstance.m_modelState + 0x80
    nm['m_dwBoneMatrix'] = add16Hex(nm['CSkeletonInstance.m_modelState'], "0x80")
    with open(file, 'w') as f:
        f.write("//" + time.strftime("%Y-%m-%d %H:%M", time.localtime()) + "\n")
        f.write("\n")
        for offset in offsets:
            f.write("// " + offset["name"] + " -> " + offset["key"] + "\n")
            f.write(nm[offset["key"]] + "\n")


if __name__ == '__main__':
    out = './output'
    ofs = "Offsets.ofs"
    # 修改编码
    os.system('chcp 65001')


    # 删除output
    if os.path.exists(out):
        p2 = shutil.rmtree(out)
    print("--------------------- delete {}".format(out))
    # 执行exe
    p3 = os.system('cs2-dumper.exe')
    print("--------------------- build {}".format(out))

    # 生成ofs
    if os.path.exists(out):
        create_ofset(ofs)
        print("--------------------- build {}".format(ofs))
        # 执行Git提交
        os.system('git add Offsets.ofs')
        os.system('git commit -m "update ofs {}"'.format(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())))
        os.system('git push')
        print("--------------------- submit {} !!! END".format(ofs))
    else:
        print("--------------------- error build {} !!! END".format(out))